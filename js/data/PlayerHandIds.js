(function(global) {
  global.Thunderjack = global.Thunderjack || {};
  Thunderjack.PlayerHandIds = Thunderjack.PlayerHandIds || {};

  //===========================================================================================
  //"static / const"
  //===========================================================================================
  Thunderjack.PlayerHandIds.LOWER_RIGHT = "lowerRight";
  Thunderjack.PlayerHandIds.LOWER_MIDDLE = "lowerMiddle";
  Thunderjack.PlayerHandIds.LOWER_LEFT = "lowerLeft";
  Thunderjack.PlayerHandIds.UPPER_RIGHT = "upperRight";
  Thunderjack.PlayerHandIds.UPPER_MIDDLE = "upperMiddle";
  Thunderjack.PlayerHandIds.UPPER_LEFT = "upperLeft";
  
  Thunderjack.PlayerHandIds.DEALER = "dealer";
  Thunderjack.PlayerHandIds.DECK = "deck";
  Thunderjack.PlayerHandIds.DISCARD_DECK = "discardDeck";
  
  Thunderjack.PlayerHandIds.ALL_PLAYERS = [
    Thunderjack.PlayerHandIds.LOWER_RIGHT,
    Thunderjack.PlayerHandIds.LOWER_MIDDLE,
    Thunderjack.PlayerHandIds.LOWER_LEFT,
    Thunderjack.PlayerHandIds.UPPER_RIGHT,
    Thunderjack.PlayerHandIds.UPPER_MIDDLE,
    Thunderjack.PlayerHandIds.UPPER_LEFT
  ];
  
  //-------------------------------------------------------------------------------------------
  //IsUpperPlayerId
  //-------------------------------------------------------------------------------------------
  Thunderjack.PlayerHandIds.IsUpperPlayerId = function(s_playerHandId) {
    return(s_playerHandId === Thunderjack.PlayerHandIds.UPPER_RIGHT ||
        s_playerHandId === Thunderjack.PlayerHandIds.UPPER_MIDDLE ||
        s_playerHandId === Thunderjack.PlayerHandIds.UPPER_LEFT);
  };
  
})(window);