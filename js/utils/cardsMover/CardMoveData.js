(function(global) {
  global.Thunderjack = global.Thunderjack || {};
  Thunderjack.CardMoveData = Thunderjack.CardMoveData || { };
  
  //===========================================================================================
  // "public"
  //===========================================================================================
  
  //-------------------------------------------------------------------------------------------
  //ctor
  //-------------------------------------------------------------------------------------------
  Thunderjack.CardMoveData = function(s_targetPlayerId, s_sourcePlayerId, b_isFaceUp) {
    this.targetPlayerId = s_targetPlayerId;
    this.sourcePlayerId = s_sourcePlayerId;
    this.isFaceUp = b_isFaceUp;
  };
  
})(window);