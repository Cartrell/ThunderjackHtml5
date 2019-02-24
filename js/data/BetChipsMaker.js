(function(global) {
  global.Thunderjack = global.Thunderjack || {};
  Thunderjack.BetChipsMaker = Thunderjack.BetChipsMaker || { };

  //===========================================================================================
  // "public"
  //===========================================================================================
  
  //-------------------------------------------------------------------------------------------
  //ctor
  //-------------------------------------------------------------------------------------------
  Thunderjack.BetChipsMaker = function() {
  };
  
  //-------------------------------------------------------------------------------------------
  //getChipIdsFor
  //-------------------------------------------------------------------------------------------
  Thunderjack.BetChipsMaker.prototype.getChipIdsFor = function(n_betValue) {
    var as_betChipIds = [];
    var n_betValueParam = n_betValue; //shuts up phaser editor about the parameter being changed 
    
    while (n_betValueParam > 0) {
      var s_highestId = this._getHighestIdUnderValue(n_betValueParam);
      if (!s_highestId) {
        break;
      }
      
      var n_chipValue = Thunderjack.BetChipsData.GetChipValue(s_highestId);
      if (n_chipValue == 0) {
        break;
      }
      
      as_betChipIds.push(s_highestId);
      n_betValueParam -= n_chipValue;
    }
    
    return(as_betChipIds);
  };
  
    
  //===========================================================================================
  // "private"
  //===========================================================================================
  
  //-------------------------------------------------------------------------------------------
  //_getHighestIdUnderValue
  //-------------------------------------------------------------------------------------------
  Thunderjack.BetChipsMaker.prototype._getHighestIdUnderValue = function(n_betValue) {
    var n_highestBetChipValue = null;
    var s_highestBetChipId = null;
    
    for (var i_index = 0; i_index < Thunderjack.BetChipsData.SortedIds.length; i_index++) {
      var s_betChipId = Thunderjack.BetChipsData.SortedIds[i_index];
      var n_blockValue = Thunderjack.BetChipsData.GetChipValue(s_betChipId);
      if (n_blockValue > n_betValue) {
        continue;
      }
      
      if (n_highestBetChipValue === null) {
        n_highestBetChipValue = n_blockValue;
        s_highestBetChipId = s_betChipId;
      } else if (n_blockValue > n_highestBetChipValue) {
        n_highestBetChipValue = n_blockValue;
        s_highestBetChipId = s_betChipId;
      }
    }
    
    return(s_highestBetChipId);
  };
})(window);