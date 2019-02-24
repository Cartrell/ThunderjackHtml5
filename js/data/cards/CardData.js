(function(global) {
  global.Thunderjack = global.Thunderjack || {};
  Thunderjack.CardData = Thunderjack.CardData || {};
  
  //===========================================================================================
  //"public"
  //===========================================================================================
  
  //===========================================================================================
  //ctor
  //===========================================================================================
  Thunderjack.CardData = function(s_cardValue, s_cardSuit, i_deckIndex, b_isFaceUp) {
    this.value = s_cardValue;
    this.suit = s_cardSuit;
    this.deckIndex = i_deckIndex;
    this.id = this.value + "_" + this.suit + "_" + this.deckIndex;
    this.isFaceUp = b_isFaceUp === true;
  };
  
})(window);