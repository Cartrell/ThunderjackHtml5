(function(global) {
  global.Thunderjack = global.Thunderjack || {};
  Thunderjack.HandPlayerIdMaps = Thunderjack.HandPlayerIdMaps || { };
  
  //key: string (player hand id)
  //data: string (hand button id)
  Thunderjack.HandPlayerIdMaps.ToHand = null;
  
  //key: string (hand button id) 
  //data: string (player hand id)
  Thunderjack.HandPlayerIdMaps.ToPlayer = null;
  
  //===========================================================================================
  // "static" functions
  //===========================================================================================
  
  //-------------------------------------------------------------------------------------------
  //Init
  //-------------------------------------------------------------------------------------------
  Thunderjack.HandPlayerIdMaps.Init = function() {
    Thunderjack.HandPlayerIdMaps.ToHand = initToHandData();
    Thunderjack.HandPlayerIdMaps.ToPlayer = initToPlayerData();
  };
  
  //===========================================================================================
  // "local" functions
  //===========================================================================================

  //-------------------------------------------------------------------------------------------
  //initToPlayerData
  //-------------------------------------------------------------------------------------------
  function initToPlayerData() {
    var data = { };
    data[Thunderjack.HandButtonIds.RIGHT] = Thunderjack.PlayerHandIds.LOWER_RIGHT;
    data[Thunderjack.HandButtonIds.MIDDLE] = Thunderjack.PlayerHandIds.LOWER_MIDDLE;
    data[Thunderjack.HandButtonIds.LEFT] = Thunderjack.PlayerHandIds.LOWER_LEFT;
    return(data);
  }

  //-------------------------------------------------------------------------------------------
  //initToHandData
  //-------------------------------------------------------------------------------------------
  function initToHandData() {
    var data = { };
    data[Thunderjack.PlayerHandIds.LOWER_RIGHT] = Thunderjack.HandButtonIds.RIGHT;
    data[Thunderjack.PlayerHandIds.LOWER_MIDDLE] = Thunderjack.HandButtonIds.MIDDLE;
    data[Thunderjack.PlayerHandIds.LOWER_LEFT] = Thunderjack.HandButtonIds.LEFT;
    return(data);
  }
})(window);