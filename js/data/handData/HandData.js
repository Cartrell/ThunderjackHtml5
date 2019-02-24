(function(global) {
  global.Thunderjack = global.Thunderjack || {};
  Thunderjack.HandData = Thunderjack.HandData || { };

  //===========================================================================================
  // "public"
  //===========================================================================================
  
  //-------------------------------------------------------------------------------------------
  //ctor
  //-------------------------------------------------------------------------------------------
  Thunderjack.HandData = function(s_handId) {
    //data: Thunderjack.CardData
    this._cards = [];
    this.handId = s_handId;
    this.score = 0;
    this.hasBlackjack = false;
    this.isBust = false;
  };
  
  //-------------------------------------------------------------------------------------------
  //addCard
  //-------------------------------------------------------------------------------------------
  Thunderjack.HandData.prototype.addCard = function (cardData) {
    if (!cardData) {
      console.log("Thunderjack.HandData.addCard. Warning: Unable to add card data");
      return(-1);
    }
    
    var i_slotIndexOfCard = this._cards.length;
    this._cards.push(cardData);
    return(i_slotIndexOfCard);
  };
  
  //-------------------------------------------------------------------------------------------
  //getAllCards
  //-------------------------------------------------------------------------------------------
  Thunderjack.HandData.prototype.getAllCards = function () {
    return(this._cards.concat());
  };
  
  //-------------------------------------------------------------------------------------------
  //getCardAt
  //-------------------------------------------------------------------------------------------
  Thunderjack.HandData.prototype.getCardAt = function (i_cardSlot) {
    return(this._cards[i_cardSlot]);
  };
  
  //-------------------------------------------------------------------------------------------
  //getFaceUpCards
  //-------------------------------------------------------------------------------------------
  Thunderjack.HandData.prototype.getFaceUpCards = function () {
    var a_faceUpCards = [];
    this._cards.forEach(function(cardData) {
      if (cardData.isFaceUp) {
        a_faceUpCards.push(cardData);
      }
    });
    return(a_faceUpCards);
  };
  
  //-------------------------------------------------------------------------------------------
  //getNumCards
  //-------------------------------------------------------------------------------------------
  Thunderjack.HandData.prototype.getNumCards = function () {
    return(this._cards.length);
  };
  
  //-------------------------------------------------------------------------------------------
  //removeAllCards
  //-------------------------------------------------------------------------------------------
  Thunderjack.HandData.prototype.removeAllCards = function () {
    var cards = this.getAllCards();
    this._cards.length = 0;
    return(cards);
  };
  
  //-------------------------------------------------------------------------------------------
  //removeCard
  //-------------------------------------------------------------------------------------------
  Thunderjack.HandData.prototype.removeCard = function () {
    return(this._cards.pop());
  };
  
  //-------------------------------------------------------------------------------------------
  //reset
  //-------------------------------------------------------------------------------------------
  Thunderjack.HandData.prototype.reset = function () {
    this.score = 0;
    this.hasBlackjack = false;
    this.isBust = false;
  };
})(window);