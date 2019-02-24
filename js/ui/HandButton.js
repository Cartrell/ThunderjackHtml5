(function(global) {
  global.Thunderjack = global.Thunderjack || {};
  Thunderjack.HandButton = Thunderjack.HandButton || {};

  //===========================================================================================
  //ctor
  //===========================================================================================
  Thunderjack.HandButton = function(s_handButtonId, s_playerHandId, handButtonPrefab) {
    this._id = s_handButtonId;
    this._playerId = s_playerHandId;
    this._handButtonPrefab = this._initHandPrefab(handButtonPrefab);
    this._isOn = false;
    this.callbackSignal = new Phaser.Signal();
  };
  
  //===========================================================================================
  // "public"
  //===========================================================================================
  
  //-------------------------------------------------------------------------------------------
  // getId
  //-------------------------------------------------------------------------------------------
  Thunderjack.HandButton.prototype.getId = function() {
    return(this._id);
  };
  
  //-------------------------------------------------------------------------------------------
  // getIsOn
  //-------------------------------------------------------------------------------------------
  Thunderjack.HandButton.prototype.getIsOn = function() {
    return(this._isOn); 
  };
  
  //-------------------------------------------------------------------------------------------
  // getPlayerId
  //-------------------------------------------------------------------------------------------
  Thunderjack.HandButton.prototype.getPlayerId = function() {
    return(this._playerId);
  };
  
  //-------------------------------------------------------------------------------------------
  // setEnabled
  //-------------------------------------------------------------------------------------------
  Thunderjack.HandButton.prototype.setEnabled = function(b_value) {
    this._handButtonPrefab.fOn.inputEnabled = this._handButtonPrefab.fOff.inputEnabled = b_value; 
  };
  
  //-------------------------------------------------------------------------------------------
  // setIsOn
  //-------------------------------------------------------------------------------------------
  Thunderjack.HandButton.prototype.setIsOn = function(b_value) {
    this._isOn = b_value;
    this._handButtonPrefab.fOn.visible = this._isOn === true; 
    this._handButtonPrefab.fOff.visible = this._isOn === false; 
  };
  
  //===========================================================================================
  // "private"
  //===========================================================================================
  
  //-------------------------------------------------------------------------------------------
  // _initHandPrefab
  //-------------------------------------------------------------------------------------------
  Thunderjack.HandButton.prototype._initHandPrefab = function(handButtonPrefab) {
    handButtonPrefab.clickCallback = new Phaser.Signal();
    handButtonPrefab.clickCallback.add(this._onButtonCallback, this);
    
    var clickSound = handButtonPrefab.game.add.sound("snd_button_click");
    handButtonPrefab.fOn.setDownSound(clickSound);
    handButtonPrefab.fOff.setDownSound(clickSound);
    
    return(handButtonPrefab);
  };
  
  //-------------------------------------------------------------------------------------------
  // _onButtonCallback
  //-------------------------------------------------------------------------------------------
  Thunderjack.HandButton.prototype._onButtonCallback = function(button) {
    this.setIsOn(!this._isOn);
    this.callbackSignal.dispatch(this._id);
  };
})(window);