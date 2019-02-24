(function(global) {
  global.Thunderjack = global.Thunderjack || {};
  Thunderjack.GameStates = Thunderjack.GameStates || {};
  
  //===========================================================================================
  //"static / const"
  //===========================================================================================
  
  Thunderjack.GameStates.IDLE = 0;
  Thunderjack.GameStates.DEAL_OPENING_CARDS = 1;
  Thunderjack.GameStates.HIT = 2;
  Thunderjack.GameStates.END_ROUND = 3;
  Thunderjack.GameStates.DISCARD_CARDS = 4;
  Thunderjack.GameStates.DOUBLE_DOWN = 5;
  Thunderjack.GameStates.SPLIT = 6;
  Thunderjack.GameStates.RECYCLE_DECK = 7;
})(window);