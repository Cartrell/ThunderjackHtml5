(function(global) {
  global.Thunderjack = global.Thunderjack || {};
  Thunderjack.PlayerData = Thunderjack.PlayerData || {};
  
  //===========================================================================================
  //"public"
  //===========================================================================================
  
  //===========================================================================================
  //ctor
  //===========================================================================================
  Thunderjack.PlayerData = function() {
    this.credits = 0;
    
    //key: string (player id)
    //data: Thunderjack.PlayerHandData
    this._hands = this._initPlayerHands(); 
  };
  
  //-------------------------------------------------------------------------------------------
  //addCard
  //-------------------------------------------------------------------------------------------
  Thunderjack.PlayerData.prototype.addCard = function (s_playerHandId, cardData) {
    var hand = this.getHandData(s_playerHandId);
    if (!hand) {
      console.log("Thunderjack.PlayerData.addCard. Warning: Invalid player id: " + s_playerHandId);
      return(-1);
    }
    
    if (!cardData) {
      console.log("Thunderjack.PlayerData.addCard. Warning: Unable to add card data");
      return(-1);
    }
    
    return(hand.addCard(cardData)); 
  };
  
  //-------------------------------------------------------------------------------------------
  //clearAllBets
  //-------------------------------------------------------------------------------------------
  Thunderjack.PlayerData.prototype.clearAllBets = function () {
    var IS_OFFSET = false;
    for (var s_playerId in this._hands) {
      var hand = this.getHandData(s_playerId);
      hand.setBet(0, IS_OFFSET);
    }
  };
  
  //-------------------------------------------------------------------------------------------
  //getBet
  //-------------------------------------------------------------------------------------------
  Thunderjack.PlayerData.prototype.getBet = function (s_playerId) {
    var hand = this.getHandData(s_playerId);
    return(hand ? hand.betValue : 0);
  };
  
  //-------------------------------------------------------------------------------------------
  //getCardAt
  //-------------------------------------------------------------------------------------------
  Thunderjack.PlayerData.prototype.getCardAt = function (s_playerHandId, i_cardSlot) {
    var hand = this.getHandData(s_playerHandId);
    return(hand ? hand.getCardAt(i_cardSlot) : null);
  };
  
  //-------------------------------------------------------------------------------------------
  //getHandData
  //-------------------------------------------------------------------------------------------
  Thunderjack.PlayerData.prototype.getHandData = function (s_playerHandId) {
    return(this._hands[s_playerHandId]);
  };
  
  //-------------------------------------------------------------------------------------------
  //getTotalBet
  //-------------------------------------------------------------------------------------------
  Thunderjack.PlayerData.prototype.getTotalBet = function (b_shouldGetNonSplitPlayersOnly) {
    var i_totalBet = 0;
    for (var s_playerId in this._hands) {
      if (b_shouldGetNonSplitPlayersOnly && Thunderjack.PlayerHandIds.IsUpperPlayerId(s_playerId)) {
        continue;
      }
      
      var handData = this.getHandData(s_playerId);
      i_totalBet += handData.betValue;
    }
    return(i_totalBet);
  };
  
  //-------------------------------------------------------------------------------------------
  //removeCard
  //-------------------------------------------------------------------------------------------
  Thunderjack.PlayerData.prototype.removeCard = function (s_playerId) {
    var hand = this.getHandData(s_playerId);
    return(hand ? hand.removeCard() : null);
  };
  
  //-------------------------------------------------------------------------------------------
  //setBet
  //-------------------------------------------------------------------------------------------
  Thunderjack.PlayerData.prototype.setBet = function (s_playerId, i_betValue, b_isOffset) {
    var hand = this.getHandData(s_playerId);
    return(hand ? hand.setBet(i_betValue, b_isOffset) : 0);
  };
  
  //-------------------------------------------------------------------------------------------
  //setCredits
  //-------------------------------------------------------------------------------------------
  Thunderjack.PlayerData.prototype.setCredits = function (i_value, b_isOffset) {
    if (b_isOffset === true) {
      this.credits += i_value;
    } else {
      this.credits = i_value;
    }
    return(this.credits);
  };
  
  //===========================================================================================
  //"private"
  //===========================================================================================

  //-------------------------------------------------------------------------------------------
  //_initPlayerHands
  //-------------------------------------------------------------------------------------------
  Thunderjack.PlayerData.prototype._initPlayerHands = function () {
    var playerHands = {};
    
    for (var i_index = 0; i_index < Thunderjack.PlayerHandIds.ALL_PLAYERS.length; i_index++) {
      var s_playerId = Thunderjack.PlayerHandIds.ALL_PLAYERS[i_index];
      playerHands[s_playerId] = new Thunderjack.PlayerHandData(s_playerId); 
    }
    
    return(playerHands);
  };
})(window);