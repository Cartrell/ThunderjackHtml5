(function(global) {
  global.Thunderjack = global.Thunderjack || {};
  Thunderjack.PlayerHandData = Thunderjack.PlayerHandData || {};

  //===========================================================================================
  //ctor
  //===========================================================================================
  Thunderjack.PlayerHandData = function(s_handId) {
    Thunderjack.HandData.call(this, s_handId);
    
    this.betValue = 0;
    this.hasThunderjack = false;
    this.isPush = false;
    this.hasBlitz = false;
    this.hasDoubled = false;
    this.hasSurrendered = false;
    this.hasSplit = false;
    this.wereAcesSplit = false;
  };
  
  //===========================================================================================
  //inherit
  //===========================================================================================
  Thunderjack.PlayerHandData.prototype = Object.create(Thunderjack.HandData.prototype);
  Thunderjack.PlayerHandData.prototype.constructor = Thunderjack.PlayerHandData; 
  
  //===========================================================================================
  //"public"
  //===========================================================================================
  
  //-------------------------------------------------------------------------------------------
  //reset
  //-------------------------------------------------------------------------------------------
  Thunderjack.PlayerHandData.prototype.reset = function () {
    Thunderjack.HandData.prototype.reset.call(this);
    this.hasThunderjack = false;
    this.isPush = false;
    this.hasBlitz = false;
    this.hasDoubled = false;
    this.hasSurrendered = false;
    this.hasSplit = false;
    this.wereAcesSplit = false;
  };
  
  //-------------------------------------------------------------------------------------------
  //setBet
  //-------------------------------------------------------------------------------------------
  Thunderjack.PlayerHandData.prototype.setBet = function (i_value, b_isOffset) {
    if (b_isOffset === true) {
      this.betValue += i_value;
    } else {
      this.betValue = i_value;
    }
    return(this.betValue);
  };
})(window);