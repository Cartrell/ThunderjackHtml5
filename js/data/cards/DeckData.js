(function(global) {
  global.Thunderjack = global.Thunderjack || {};
  Thunderjack.DeckData = Thunderjack.DeckData || {};
  
  //===========================================================================================
  //"public"
  //===========================================================================================
  
  //===========================================================================================
  //ctor
  //===========================================================================================
  Thunderjack.DeckData = function(i_numDecks) {
    
    //data: Thunderjack.CardData
    this._cardsData = [];
    
    this._init(i_numDecks);
  };
  
  //-------------------------------------------------------------------------------------------
  //containsCardData
  //-------------------------------------------------------------------------------------------
  Thunderjack.DeckData.prototype.containsCardData = function(cardData) {
    return(this.indexOf(cardData) > -1);
  };
  
  //-------------------------------------------------------------------------------------------
  //getLength
  //-------------------------------------------------------------------------------------------
  Thunderjack.DeckData.prototype.getLength = function() {
    return(this._cardsData.length);
  };
  
  //-------------------------------------------------------------------------------------------
  //indexOf
  //-------------------------------------------------------------------------------------------
  Thunderjack.DeckData.prototype.indexOf = function(cardData) {
    return(this._cardsData.indexOf(cardData));
  };
  
  //-------------------------------------------------------------------------------------------
  //indexOfId
  //-------------------------------------------------------------------------------------------
  Thunderjack.DeckData.prototype.indexOfId = function(s_cardId) {
    var i_length = this._cardsData.length;
    for (var i_index = 0; i_index < i_length; i_index++) {
      var cardData = this._cardsData[i_index];
      if (cardData.id === s_cardId) {
        return(i_index);
      }
    }
    return(-1);
  };
  
  //-------------------------------------------------------------------------------------------
  //peekCardData
  //-------------------------------------------------------------------------------------------
  Thunderjack.DeckData.prototype.peekCardData = function() {
    var i_length = this.getLength(); 
    return(i_length > 0 ? this._cardsData[i_length - 1] : null);
  };
  
  //-------------------------------------------------------------------------------------------
  //popCardData
  //-------------------------------------------------------------------------------------------
  Thunderjack.DeckData.prototype.popCardData = function() {
    return(this.getLength() > 0 ? this._cardsData.pop() : null);
  };
  
  //-------------------------------------------------------------------------------------------
  //pushCardData
  //-------------------------------------------------------------------------------------------
  Thunderjack.DeckData.prototype.pushCardData = function(cardData) {
    if (cardData instanceof Thunderjack.CardData && !this.containsCardData(cardData)) {
      this._cardsData.push(cardData);
    }
  };
  
  //-------------------------------------------------------------------------------------------
  //shuffle
  //-------------------------------------------------------------------------------------------
  Thunderjack.DeckData.prototype.shuffle = function() {
    Phaser.ArrayUtils.shuffle(this._cardsData);
  };
  
  //-------------------------------------------------------------------------------------------
  //swap
  //-------------------------------------------------------------------------------------------
  Thunderjack.DeckData.prototype.swap = function(s_cardId, i_indexToSwapAt) {
    if (i_indexToSwapAt < 0 || i_indexToSwapAt >= this.getLength()) {
      return;
    }
    
    var i_indexOf = this.indexOfId(s_cardId);
    if (i_indexOf > -1) {
      var cardData = this._cardsData[i_indexToSwapAt];
      this._cardsData[i_indexToSwapAt] = this._cardsData[i_indexOf]; 
      this._cardsData[i_indexOf] = cardData;
    }
  };
  
  //===========================================================================================
  //"private"
  //===========================================================================================
  
  //-------------------------------------------------------------------------------------------
  //_init
  //-------------------------------------------------------------------------------------------
  Thunderjack.DeckData.prototype._init = function(i_numDecks) {
    var i_decksCount;
    if (typeof i_numDecks === "number") {
      i_decksCount = i_numDecks;
    } else {
      return;
    }
    
    for (var i_deckIndex = 0; i_deckIndex < i_decksCount; i_deckIndex++) {
      for (var i_valueIndex = 0; i_valueIndex < Thunderjack.CardValues.ALL.length; i_valueIndex++) {
        var s_value = Thunderjack.CardValues.ALL[i_valueIndex];
        for (var i_suitIndex = 0; i_suitIndex < Thunderjack.CardSuits.ALL.length; i_suitIndex++) {
          var s_suit = Thunderjack.CardSuits.ALL[i_suitIndex];
          this._cardsData.push(new Thunderjack.CardData(s_value, s_suit, i_deckIndex));
        }
      }
    }
  };
})(window);