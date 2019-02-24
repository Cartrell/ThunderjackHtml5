(function(global) {
  global.Thunderjack = global.Thunderjack || {};
  Thunderjack.BetChipsData = Thunderjack.BetChipsData || initData();
  
  //===========================================================================================
  // "public"
  //===========================================================================================
  
  //-------------------------------------------------------------------------------------------
  //GetChipValue
  //-------------------------------------------------------------------------------------------
  Thunderjack.BetChipsData.GetChipValue = function(s_betChipId) {
    var data = Thunderjack.BetChipsData.Blocks[s_betChipId];
    return(data ? data.value : 0);
  };
  
  //===========================================================================================
  // local
  //===========================================================================================
  
  //-------------------------------------------------------------------------------------------
  //initData
  //-------------------------------------------------------------------------------------------
  function initData() {
    var data = { };
    
    data.Ids = { };
    data.Ids.GREEN = "green";
    data.Ids.PURPLE = "purple";
    data.Ids.RED = "red";
    data.Ids.BLUE = "blue";
    
    data.Blocks = { };
    data.Blocks[data.Ids.GREEN] = {
        value: 10,
        betChipFrame: 'chip_green'
    };
    
    data.Blocks[data.Ids.PURPLE] = {
        value: 50,
        betChipFrame: 'chip_purple'
    };
    
    data.Blocks[data.Ids.RED] = {
        value: 250,
        betChipFrame: 'chip_red'
    };
    
    data.Blocks[data.Ids.BLUE] = {
        value: 1000,
        betChipFrame: 'chip_blue'
    };
    
    data.SortedIds = [
      data.Ids.GREEN,
      data.Ids.PURPLE,
      data.Ids.RED,
      data.Ids.BLUE
    ];
    
    return(data);
  }
})(window);