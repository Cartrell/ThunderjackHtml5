(function(global) {
  global.Thunderjack = global.Thunderjack || {};
  Thunderjack.CardsMover = Thunderjack.CardsMover || {};
  
  //===========================================================================================
  //"public"
  //===========================================================================================
  
  //-------------------------------------------------------------------------------------------
  //ctor
  //-------------------------------------------------------------------------------------------
  Thunderjack.CardsMover = function(gamePlayUi, i_durationSecs, i_rateSecs) {
    this.durationSecs = typeof i_durationSecs === 'number' ? i_durationSecs :  250;
    this.rateSecs = typeof i_rateSecs === 'number' ? i_rateSecs : 0.15;
    
    //This signal is dispatched when all cards in the queue have completed moving.
    this.completeSignal = new Phaser.Signal();
    
    //This signal is dispatched when a single card in the queue has completed moving.
    //Parameters:
    // cardUi: Thunderjack.CardUi. The card image that just completed moving
    // cardMoveData: Thunderjack.CardMoveData. The data supplied when the card was enqueued. 
    this.cardCompleteSignal = new Phaser.Signal();
    
    //parameters sent wihen the signal is dispatched:
    // cardUi: Thunderjack.CardUi. The card image that just completed moving
    // cardMoveData: Thunderjack.CardMoveData. The data supplied when the card was enqueued. 
    this.startSignal = new Phaser.Signal();
    
    this._gamePlayUi = gamePlayUi;
    
    //data: Thunderjack.CardMoveData
    this._cardMoveDataInQueue = [];
    
    //data: Phaser.Tween
    this._tweens = [];
    
    this._timerEvent = null;
  };
  
  //-------------------------------------------------------------------------------------------
  //enqueue
  //-------------------------------------------------------------------------------------------
  Thunderjack.CardsMover.prototype.enqueue = function(cardMoveData) {
    if (cardMoveData) {
      this._cardMoveDataInQueue.push(cardMoveData);
      return(true);
    }
    
    return(false);
  };
  
  //-------------------------------------------------------------------------------------------
  //start
  //-------------------------------------------------------------------------------------------
  Thunderjack.CardsMover.prototype.start = function() {
    this._next();
  };
  
  //===========================================================================================
  //"private"
  //===========================================================================================
  
  //-------------------------------------------------------------------------------------------
  //_createCardUi
  //-------------------------------------------------------------------------------------------
  Thunderjack.CardsMover.prototype._createCardUi = function(cardData, n_x, n_y, cardMoveData) {
    var cardUi = this._gamePlayUi.createCard(cardData);
    if (!cardUi) {
      return(null);
    }
    
    cardUi.image.x = n_x;
    cardUi.image.y = n_y;
    cardUi.isFaceUp(cardMoveData.isFaceUp);
    
    this._gamePlayUi.getCardsGroup().add(cardUi.image);
    return(cardUi);
  };
  
  //-------------------------------------------------------------------------------------------
  //_createTimer
  //-------------------------------------------------------------------------------------------
  Thunderjack.CardsMover.prototype._createTimer = function() {
    var timer = this._gamePlayUi.getCanvas().game.time.create(); 
    this._timerEvent = timer.add(this.rateSecs * Phaser.Timer.SECOND, this._onTimerMoveComplete, this);
    timer.start();
  };
  
  //-------------------------------------------------------------------------------------------
  //_createTween
  //-------------------------------------------------------------------------------------------
  Thunderjack.CardsMover.prototype._createTween = function(cardUiImage, cardMoveData, properties) {
    var game = this._gamePlayUi.getCanvas().game;
    var EASING = Phaser.Easing.Default;
    var SHOULD_AUTO_START = true;
    var tween = game.tweens.create(cardUiImage).to(properties, this.durationSecs * Phaser.Timer.SECOND,
      EASING, SHOULD_AUTO_START);
    
    var PRIORITY = undefined;
    var ARGS = cardMoveData;
    tween.onComplete.addOnce(this._onMoveTweenComplete, this, PRIORITY, ARGS);
    
    this._tweens.push(tween);
  };
  
  //-------------------------------------------------------------------------------------------
  //_getCardUiImage
  //-------------------------------------------------------------------------------------------
  Thunderjack.CardsMover.prototype._getCardUiImage = function(cardData) {
    var cardUi = this._gamePlayUi.getCardUi(cardData); 
    return(cardUi ? cardUi.image : null);
  };

  //-------------------------------------------------------------------------------------------
  //_getPlayerHandUi
  //-------------------------------------------------------------------------------------------
  Thunderjack.CardsMover.prototype._getPlayerHandUi = function(s_playerId) {
    if (Thunderjack.PlayerHandIds.ALL_PLAYERS.indexOf(s_playerId) > -1) {
      return(this._gamePlayUi.playerHandsById[s_playerId]);
    } else if (s_playerId === Thunderjack.PlayerHandIds.DEALER) {
      return(this._gamePlayUi.dealerHand);
    }
    
    return(null);
  };
  
  //-------------------------------------------------------------------------------------------
  //_getPlayerHandUiTargetPosition
  //-------------------------------------------------------------------------------------------
  Thunderjack.CardsMover.prototype._getPlayerHandUiTargetPosition = function(s_targetPlayerId) {
    var targetHandUi = this._getPlayerHandUi(s_targetPlayerId);
    if (!targetHandUi) {
      console.log("Thunderjack.CardsMover._getPlayerHandUiTargetPosition. Warning: Invalid target player hand id: " +
        s_targetPlayerId);
      return(null);
    }
    
    var targetPlayerData = this._gamePlayUi.getCanvas().getPlayerOrDealerHand(s_targetPlayerId);
    var i_targetCardSlot = targetPlayerData.getNumCards();
    
    var pTargetPosition = null;
    if (typeof (i_targetCardSlot) === "number") {
      pTargetPosition = targetHandUi.getCardPositionAt(i_targetCardSlot);
    }
    
    if (!pTargetPosition) {
      console.log("Thunderjack.CardsMover._getPlayerHandUiTargetPosition. Warning: Invalid card slot: " +
        i_targetCardSlot);
    }
    
    return(pTargetPosition);
  };
  
  //-------------------------------------------------------------------------------------------
  //_getSourcePosition
  //-------------------------------------------------------------------------------------------
  Thunderjack.CardsMover.prototype._getSourcePosition = function(cardMoveData) {
    var s_sourcePlayerId = cardMoveData.sourcePlayerId;
    
    if (Thunderjack.PlayerHandIds.ALL_PLAYERS.indexOf(s_sourcePlayerId) > -1 ||
    s_sourcePlayerId === Thunderjack.PlayerHandIds.DEALER) {
      return(this._getCardUiImage(this._getTopCardData(s_sourcePlayerId)));
    } else if (s_sourcePlayerId === Thunderjack.PlayerHandIds.DECK) {
      return(this._gamePlayUi.getCanvas().fDeck);
    } else if (s_sourcePlayerId === Thunderjack.PlayerHandIds.DISCARD_DECK) {
      return(this._gamePlayUi.getCanvas().fDiscard_deck);
    }
    
    return(null);
  };
  
  //-------------------------------------------------------------------------------------------
  //_getTargetPosition
  //-------------------------------------------------------------------------------------------
  Thunderjack.CardsMover.prototype._getTargetPosition = function(cardMoveData) {
    var s_targetPlayerId = cardMoveData.targetPlayerId;
    
    if (Thunderjack.PlayerHandIds.ALL_PLAYERS.indexOf(s_targetPlayerId) > -1 ||
    s_targetPlayerId === Thunderjack.PlayerHandIds.DEALER) {
      return(this._getPlayerHandUiTargetPosition(s_targetPlayerId));
    } else if (s_targetPlayerId === Thunderjack.PlayerHandIds.DECK) {
      return(this._gamePlayUi.getCanvas().fDeck);
    } else if (s_targetPlayerId === Thunderjack.PlayerHandIds.DISCARD_DECK) {
      return(this._gamePlayUi.getCanvas().fDiscard_deck);
    }
    
    return(null);
  };
  
  //-------------------------------------------------------------------------------------------
  //_getTopCardData
  //-------------------------------------------------------------------------------------------
  Thunderjack.CardsMover.prototype._getTopCardData = function(s_playerId) {
    if (Thunderjack.PlayerHandIds.ALL_PLAYERS.indexOf(s_playerId) > -1 ||
    s_playerId === Thunderjack.PlayerHandIds.DEALER) {
      var handData = this._gamePlayUi.getCanvas().getPlayerOrDealerHand(s_playerId);
      return(handData.getCardAt(handData.getNumCards() - 1));
    }
    
    var deckData = null;
    if (s_playerId === Thunderjack.PlayerHandIds.DECK) {
      deckData = this._gamePlayUi.getCanvas().getDeckData();
    } else if (s_playerId === Thunderjack.PlayerHandIds.DISCARD_DECK) {
      deckData = this._gamePlayUi.getCanvas().getDiscardDeckData();
    }
    
    return (deckData ? deckData.peekCardData() : null);
  };

  //-------------------------------------------------------------------------------------------
  //_isDone
  //-------------------------------------------------------------------------------------------
  Thunderjack.CardsMover.prototype._isDone = function() {
    return(
      this._cardMoveDataInQueue.length === 0 &&
      this._tweens.length === 0);
  };
  
  //-------------------------------------------------------------------------------------------
  //_move
  //-------------------------------------------------------------------------------------------
  Thunderjack.CardsMover.prototype._move = function(cardMoveData) {
    var pTargetPosition = this._getTargetPosition(cardMoveData);
    if (!pTargetPosition) {
      console.log("Thunderjack.CardsMover._move. Warning: Unable to obtain target position.");
      return(false);
    }
    
    var pSourcePosition = this._getSourcePosition(cardMoveData);
    if (!pSourcePosition) {
      console.log("Thunderjack.CardsMover._move. Warning: Unable to obtain source position.");
      return(false);
    }
    
    var cardData = this._popSourceCardData(cardMoveData);
    if (!cardData) {
      console.log("Thunderjack.CardsMover._move. Warning: Unable to retrieve source card data.");
      return(false);
    }
    
    var cardUi = this._createCardUi(cardData, pSourcePosition.x, pSourcePosition.y, cardMoveData);
    
    this._pushTargetCardData(cardMoveData, cardData);
    
    var properties = {
      x: pTargetPosition.x,
      y: pTargetPosition.y
    };
    
    this._createTween(cardUi.image, cardMoveData, properties);
    this.startSignal.dispatch(cardUi, cardMoveData);
    
    return(true);
  };
  
  //-------------------------------------------------------------------------------------------
  //_next
  //-------------------------------------------------------------------------------------------
  Thunderjack.CardsMover.prototype._next = function() {
    if (this._timerEvent) {
      //timer already running - too early to begin moving the next card - should never happen, but just in case
      return;
    }
    
    var cardMoveData = this._cardMoveDataInQueue.shift();
    if (!cardMoveData) {
      return;
    }
    
    if (!this._move(cardMoveData)) {
      //unable to move the current card - lets try the next one
      this._next();
    } else {
      //card move started ok - begin the delay timer to move the next card
      this._createTimer();
    }
  };
  
  //-------------------------------------------------------------------------------------------
  //_onMoveTweenComplete
  //-------------------------------------------------------------------------------------------
  Thunderjack.CardsMover.prototype._onMoveTweenComplete = function(target, tween, cardMoveData) {
    this._removeTween(tween);
    
    var cardImage = target;
    var cardUi = cardImage.cardUi;
    this.cardCompleteSignal.dispatch(cardUi, cardMoveData);
    
    if (this._isDone()) {
      this.completeSignal.dispatch();
    }
  };
  
  //-------------------------------------------------------------------------------------------
  //_onTimerMoveComplete
  //-------------------------------------------------------------------------------------------
  Thunderjack.CardsMover.prototype._onTimerMoveComplete = function() {
    this._timerEvent = null;
    this._next();
  };
  
  //-------------------------------------------------------------------------------------------
  //_popSourceCardData
  //-------------------------------------------------------------------------------------------
  Thunderjack.CardsMover.prototype._popSourceCardData = function(cardMoveData) {
    var s_sourcePlayerId = cardMoveData.sourcePlayerId;
    
    if (Thunderjack.PlayerHandIds.ALL_PLAYERS.indexOf(s_sourcePlayerId) > -1 ||
    s_sourcePlayerId === Thunderjack.PlayerHandIds.DEALER) {
      var handData = this._gamePlayUi.getCanvas().getPlayerOrDealerHand(s_sourcePlayerId);
      return(handData.removeCard());
    }
    
    var deckData = null;
    if (s_sourcePlayerId === Thunderjack.PlayerHandIds.DECK) {
      deckData = this._gamePlayUi.getCanvas().getDeckData();
    } else if (s_sourcePlayerId === Thunderjack.PlayerHandIds.DISCARD_DECK) {
      deckData = this._gamePlayUi.getCanvas().getDiscardDeckData();
    }
    
    return (deckData ? deckData.popCardData() : null);
  };
  
  //-------------------------------------------------------------------------------------------
  //_pushTargetCardData
  //-------------------------------------------------------------------------------------------
  Thunderjack.CardsMover.prototype._pushTargetCardData = function(cardMoveData, cardData) {
    var s_targetPlayerId = cardMoveData.targetPlayerId;
    
    if (Thunderjack.PlayerHandIds.ALL_PLAYERS.indexOf(s_targetPlayerId) > -1 ||
        s_targetPlayerId === Thunderjack.PlayerHandIds.DEALER) {
      var handData = this._gamePlayUi.getCanvas().getPlayerOrDealerHand(s_targetPlayerId);
      handData.addCard(cardData);
      return;
    }
    
    var deckData = null;
    if (s_targetPlayerId === Thunderjack.PlayerHandIds.DECK) {
      deckData = this._gamePlayUi.getCanvas().getDeckData();
    } else if (s_targetPlayerId === Thunderjack.PlayerHandIds.DISCARD_DECK) {
      deckData = this._gamePlayUi.getCanvas().getDiscardDeckData();
    }
    
    if (deckData) {
      deckData.pushCardData(cardData);
    }
  };
  
  //-------------------------------------------------------------------------------------------
  //_removeTween
  //-------------------------------------------------------------------------------------------
  Thunderjack.CardsMover.prototype._removeTween = function(tween) {
    var i_index = this._tweens.indexOf(tween);
    if (i_index > -1) {
      this._tweens.splice(i_index, 1);
    }
  };
})(window);