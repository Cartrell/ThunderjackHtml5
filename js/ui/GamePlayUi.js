(function(global) {
  global.Thunderjack = global.Thunderjack || {};
  Thunderjack.GamePlayUi = Thunderjack.GamePlayUi || {};
  
  //===========================================================================================
  //ctor
  //===========================================================================================
  Thunderjack.GamePlayUi = function(gamePlayCanvas) {
    //key: string (player hand id)
    //data: Thunderjack.PlayerHandUi
    this.playerHandsById = { };
    
    //key: string (player hand id)
    //data: Phaser.Sprite
    this.thunderBoltsByPlayerId = { };
    
    //key: string (card data id)
    //data: Thunderjack.CardUi
    this._cardUisById = { };
    
    this.dealerHand = null;
    
    this._animatedBackground = null;
    
    this._canvas = gamePlayCanvas;
    
    this._deckUi = this._initDeck(this._canvas.fDeck);
    this._discardDeckUi = this._initDeck(this._canvas.fDiscard_deck, 0);
    
    this._canvas.fBet_chips.init(this._canvas.onBetChipPressed, this._canvas);
    
    this.handButtons = new Thunderjack.HandButtons(this);
    
    this._creditsBmpText = new Thunderjack.BitmapText(this._canvas.game, this._canvas.fCreditsTextNode);
    this._betBmpText = new Thunderjack.BitmapText(this._canvas.game, this._canvas.fBetTextNode);
    this._amountWonBmpText = new Thunderjack.BitmapText(this._canvas.game, this._canvas.fYouWonTextNode);
    
    this._cardsGroup = this._canvas.fCards_container;
    
    this._betButtonsGroup = this._canvas.fBet_buttons;
    
    this._betButton = this._canvas.fBet_button;
    this._betButton.setDownSound(this._canvas.game.add.sound("snd_button_click"));
    
    this._canvas.fClear_button.setDownSound(this._canvas.game.add.sound("snd_button_click"));
    
    this._initPlayerHands();
    
    this.cardsMoverCardCompleteSignal = new Phaser.Signal();
    this.cardsMoverCompleteSignal = new Phaser.Signal();
    this.cardsMoverStartSignal = new Phaser.Signal();
    
    this._initCardsMover();
    this._initThunderbolts();
    this._initAnimatedBackground();
  };
  
  //===========================================================================================
  // "public" functions
  //===========================================================================================

  //-------------------------------------------------------------------------------------------
  //createCard
  //-------------------------------------------------------------------------------------------
  Thunderjack.GamePlayUi.prototype.createCard = function (cardData) {
    if (!cardData) {
      return(null);
    }
    
    var cardUi = this.getCardUi(cardData) || new Thunderjack.CardUi(cardData, this._canvas.game);
    this._cardUisById[cardData.id] = cardUi; 
    return(cardUi);
  };
  
  //-------------------------------------------------------------------------------------------
  //dealCardTo
  //-------------------------------------------------------------------------------------------
  Thunderjack.GamePlayUi.prototype.dealCardTo = function (s_targetPlayerId, b_isCardFaceUp) {
    var cardMoveData = new Thunderjack.CardMoveData(s_targetPlayerId, Thunderjack.PlayerHandIds.DECK,
      b_isCardFaceUp);
    this._cardsMover.enqueue(cardMoveData);
  };
  
  //-------------------------------------------------------------------------------------------
  //discardCard
  //-------------------------------------------------------------------------------------------
  Thunderjack.GamePlayUi.prototype.discardCard = function (s_sourcePlayerId) {
    var cardMoveData = new Thunderjack.CardMoveData(Thunderjack.PlayerHandIds.DISCARD_DECK, s_sourcePlayerId);
    this._cardsMover.enqueue(cardMoveData);
  };
  
  //-------------------------------------------------------------------------------------------
  //disposeCard
  //-------------------------------------------------------------------------------------------
  Thunderjack.GamePlayUi.prototype.disposeCard = function (cardData) {
    var cardUi = this.getCardUi(cardData);
    if (cardUi) {
      delete this._cardUisById[cardData.id];
      cardUi.dispose();
    }
  };
  
  //-------------------------------------------------------------------------------------------
  //getCanvas
  //-------------------------------------------------------------------------------------------
  Thunderjack.GamePlayUi.prototype.getCanvas = function () {
    return(this._canvas);
  };
  
  //-------------------------------------------------------------------------------------------
  //getCardsGroup
  //-------------------------------------------------------------------------------------------
  Thunderjack.GamePlayUi.prototype.getCardsGroup = function () {
    return(this._cardsGroup);
  };
  
  //-------------------------------------------------------------------------------------------
  //getCardUi
  //-------------------------------------------------------------------------------------------
  Thunderjack.GamePlayUi.prototype.getCardUi = function (cardData) {
    return(cardData ? this._cardUisById[cardData.id] : null); 
  };
  
  //-------------------------------------------------------------------------------------------
  //getDeckUi
  //-------------------------------------------------------------------------------------------
  Thunderjack.GamePlayUi.prototype.getDeckUi = function () {
    return(this._deckUi);
  };
  
  //-------------------------------------------------------------------------------------------
  //getDiscardDeckUi
  //-------------------------------------------------------------------------------------------
  Thunderjack.GamePlayUi.prototype.getDiscardDeckUi = function () {
    return(this._discardDeckUi);
  };
  
  //-------------------------------------------------------------------------------------------
  //hideAmountWon
  //-------------------------------------------------------------------------------------------
  Thunderjack.GamePlayUi.prototype.hideAmountWon = function () {
    this._amountWonBmpText.text().visible = false;
  };
  
  //-------------------------------------------------------------------------------------------
  //moveCardFromTo
  //-------------------------------------------------------------------------------------------
  Thunderjack.GamePlayUi.prototype.moveCardFromTo = function (s_sourcePlayerId, s_targetPlayerId) {
    var cardMoveData = new Thunderjack.CardMoveData(s_targetPlayerId, s_sourcePlayerId);
    this._cardsMover.enqueue(cardMoveData);
  };
  
  //-------------------------------------------------------------------------------------------
  //moveCards
  //-------------------------------------------------------------------------------------------
  Thunderjack.GamePlayUi.prototype.moveCards = function (i_durationSecs, i_rateSecs) {
    if (i_durationSecs !== undefined) {
      this._cardsMover.durationSecs = i_durationSecs;
    }
    
    if (i_rateSecs !== undefined) {
      this._cardsMover.rateSecs = i_rateSecs;
    }
    
    this._cardsMover.start();
  };
  
  //-------------------------------------------------------------------------------------------
  //recycleCard
  //-------------------------------------------------------------------------------------------
  Thunderjack.GamePlayUi.prototype.recycleCard = function () {
    var cardMoveData = new Thunderjack.CardMoveData(Thunderjack.PlayerHandIds.DECK, Thunderjack.PlayerHandIds.DISCARD_DECK);
    this._cardsMover.enqueue(cardMoveData);
  };
  
  //-------------------------------------------------------------------------------------------
  //setBet
  //-------------------------------------------------------------------------------------------
  Thunderjack.GamePlayUi.prototype.setBet = function (i_value) {
    this._betBmpText.setText("Bet: " + i_value);
  };
  
  //-------------------------------------------------------------------------------------------
  //setAllBetUisVisible
  //-------------------------------------------------------------------------------------------
  Thunderjack.GamePlayUi.prototype.setAllBetUisVisible = function (b_isVisible) {
    this.handButtons.setVisible(b_isVisible);
    this._canvas.fBet_chips.visible = b_isVisible;
    this._betButtonsGroup.visible = b_isVisible;
  };
  
  //-------------------------------------------------------------------------------------------
  //setBetButtonEnabled
  //-------------------------------------------------------------------------------------------
  Thunderjack.GamePlayUi.prototype.setBetButtonEnabled = function (b_isEnabled) {
    this._betButton.inputEnabled = b_isEnabled;
    
    var STATE_UP = "Up";
    var FRAME = b_isEnabled ? "game_button_bet_norm" : "game_button_bet_disabled";
    var SHOULD_SWITCH_IMMEDIATELY = true;
    
    this._betButton.setStateFrame(STATE_UP, FRAME, SHOULD_SWITCH_IMMEDIATELY); 
  };
  
  //-------------------------------------------------------------------------------------------
  //setCredits
  //-------------------------------------------------------------------------------------------
  Thunderjack.GamePlayUi.prototype.setCredits = function (i_value) {
    this._creditsBmpText.setText("Credits: " + i_value);
  };
  
  //-------------------------------------------------------------------------------------------
  //setDoubleButtonVisible
  //-------------------------------------------------------------------------------------------
  Thunderjack.GamePlayUi.prototype.setDoubleButtonVisible = function (b_isVisible) {
    this._canvas.fGame_button_double.visible = b_isVisible;
  };
  
  //-------------------------------------------------------------------------------------------
  //setGameButtonsVisible
  //-------------------------------------------------------------------------------------------
  Thunderjack.GamePlayUi.prototype.setGameButtonsVisible = function (b_isVisible) {
    this._canvas.fGame_buttons.visible = b_isVisible;
  };
  
  //-------------------------------------------------------------------------------------------
  //setSplitButtonVisible
  //-------------------------------------------------------------------------------------------
  Thunderjack.GamePlayUi.prototype.setSplitButtonVisible = function (b_isVisible) {
    this._canvas.fGame_button_split.visible = b_isVisible;
  };
  
  //-------------------------------------------------------------------------------------------
  //setSurrenderButtonVisible
  //-------------------------------------------------------------------------------------------
  Thunderjack.GamePlayUi.prototype.setSurrenderButtonVisible = function (b_isVisible) {
    this._canvas.fGame_button_surrender.visible = b_isVisible;
  };
  
  //-------------------------------------------------------------------------------------------
  //showAmountWon
  //-------------------------------------------------------------------------------------------
  Thunderjack.GamePlayUi.prototype.showAmountWon = function (i_value) {
    this._amountWonBmpText.setText("You Won: " + i_value);
    this._amountWonBmpText.text().visible = true;
  };
  
  //===========================================================================================
  // "private" functions
  //===========================================================================================
  
  //-------------------------------------------------------------------------------------------
  //_initAnimatedBackground
  //-------------------------------------------------------------------------------------------
  Thunderjack.GamePlayUi.prototype._initAnimatedBackground = function () {
    this._animatedBackground = new Thunderjack.AnimatedBackground(this._canvas.game, this._canvas.fBackground);
    this._animatedBackground.start();
  };
  
  //-------------------------------------------------------------------------------------------
  //_initCardsMover
  //-------------------------------------------------------------------------------------------
  Thunderjack.GamePlayUi.prototype._initCardsMover = function () {
    this._cardsMover = new Thunderjack.CardsMover(this,
      Thunderjack.DesignData.CARD_DEAL_DURATION_SECS,
      Thunderjack.DesignData.CARD_DEAL_RATE_SECS);
    
    this._cardsMover.startSignal.add(this._onCardsMoverStart, this);
    this._cardsMover.cardCompleteSignal.add(this._onCardsMoverCardComplete, this);
    this._cardsMover.completeSignal.add(this._onCardsMoverComplete, this);
  };
  
  //-------------------------------------------------------------------------------------------
  //_initDeck
  //-------------------------------------------------------------------------------------------
  Thunderjack.GamePlayUi.prototype._initDeck = function (deckPrefab, n_initialRatio) {
    var deckUi = new Thunderjack.DeckUi(deckPrefab);
    deckUi.setVisibleRatio(n_initialRatio);
    return(deckUi);
  };
  
  //-------------------------------------------------------------------------------------------
  //_initPlayerHand
  //-------------------------------------------------------------------------------------------
  Thunderjack.GamePlayUi.prototype._initPlayerHand = function (s_id, playerHandPrefab) {
    this.playerHandsById[s_id] = new Thunderjack.PlayerHandUi(playerHandPrefab);
  };
  
  //-------------------------------------------------------------------------------------------
  //_initPlayerHands
  //-------------------------------------------------------------------------------------------
  Thunderjack.GamePlayUi.prototype._initPlayerHands = function () {
    this.dealerHand = new Thunderjack.HandUi(this._canvas.fDealer);
    
    this._initPlayerHand(Thunderjack.PlayerHandIds.LOWER_RIGHT, this._canvas.fBottom_right_player);
    this._initPlayerHand(Thunderjack.PlayerHandIds.LOWER_MIDDLE, this._canvas.fBottom_middle_player);
    this._initPlayerHand(Thunderjack.PlayerHandIds.LOWER_LEFT, this._canvas.fBottom_left_player);
    this._initPlayerHand(Thunderjack.PlayerHandIds.UPPER_RIGHT, this._canvas.fTop_right_player);
    this._initPlayerHand(Thunderjack.PlayerHandIds.UPPER_MIDDLE, this._canvas.fTop_middle_player);
    this._initPlayerHand(Thunderjack.PlayerHandIds.UPPER_LEFT, this._canvas.fTop_left_player);
  };
  
  //-------------------------------------------------------------------------------------------
  //_initThunderbolts
  //-------------------------------------------------------------------------------------------
  Thunderjack.GamePlayUi.prototype._initThunderbolts = function () {
    this.thunderBoltsByPlayerId = { };
    this.thunderBoltsByPlayerId[Thunderjack.PlayerHandIds.LOWER_LEFT] = this._canvas.fThunderboltLeft;
    this.thunderBoltsByPlayerId[Thunderjack.PlayerHandIds.LOWER_MIDDLE] = this._canvas.fThunderboltMiddle;
    this.thunderBoltsByPlayerId[Thunderjack.PlayerHandIds.LOWER_RIGHT] = this._canvas.fThunderboltRight;
    
    for (var s_id in this.thunderBoltsByPlayerId) {
      this.thunderBoltsByPlayerId[s_id].visible = false;
    }
  };
  
  //-------------------------------------------------------------------------------------------
  //_onCardsMoverCardComplete
  //-------------------------------------------------------------------------------------------
  Thunderjack.GamePlayUi.prototype._onCardsMoverCardComplete = function (cardUi, cardMoveData) {
    if (this._updateDeckUi(cardMoveData.targetPlayerId)) {
      this.disposeCard(cardUi.cardData);
    }
    
    this.cardsMoverCardCompleteSignal.dispatch(cardMoveData);
  };
  
  //-------------------------------------------------------------------------------------------
  //_onCardsMoverComplete
  //-------------------------------------------------------------------------------------------
  Thunderjack.GamePlayUi.prototype._onCardsMoverComplete = function (cardUi, cardMoveData) {
    this.cardsMoverCompleteSignal.dispatch();
  };
  
  //-------------------------------------------------------------------------------------------
  //_onCardsMoverStart
  //-------------------------------------------------------------------------------------------
  Thunderjack.GamePlayUi.prototype._onCardsMoverStart = function (cardUi, cardMoveData) {
    this._updateDeckUi(cardMoveData.sourcePlayerId);
    this.cardsMoverStartSignal.dispatch(cardUi, cardMoveData);
  };
  
  //-------------------------------------------------------------------------------------------
  //_updateDeckUi
  //-------------------------------------------------------------------------------------------
  Thunderjack.GamePlayUi.prototype._updateDeckUi = function(s_playerId) {
    var deckUi;
    var deckData;
    
    if (s_playerId === Thunderjack.PlayerHandIds.DECK) {
      deckUi = this._deckUi;
      deckData = this._canvas.getDeckData();
    } else if (s_playerId === Thunderjack.PlayerHandIds.DISCARD_DECK) {
      deckUi = this._discardDeckUi; 
      deckData = this._canvas.getDiscardDeckData();
    } else {
      return(false);
    }
    
    var n_ratio = deckData.getLength() / this._canvas.getTotalNumCards();
    deckUi.setVisibleRatio(n_ratio);
    
    return(true);
  };
})(window);