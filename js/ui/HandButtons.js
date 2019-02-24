(function(global) {
  global.Thunderjack = global.Thunderjack || {};
  Thunderjack.HandButtons = Thunderjack.HandButtons || {};

  //===========================================================================================
  //ctor
  //===========================================================================================
  Thunderjack.HandButtons = function(gamePlayUi) {
    this.gamePlayUi = gamePlayUi;
    //key: string (hand button id)
    //data: true
    this.selectedHands = { };
    
    //key: string (hand button id)
    //data: Thunderjack.HandButton
    this._handButtonsById = { };
    
    this._handButtons = this.gamePlayUi.getCanvas().fHand_buttons; 
    
    this._init();
  };
  
  //===========================================================================================
  // "public" functions
  //===========================================================================================
  
  //-------------------------------------------------------------------------------------------
  //setVisible
  //-------------------------------------------------------------------------------------------
  Thunderjack.HandButtons.prototype.setVisible = function(b_value) {
    this._handButtons.visible = b_value;
  };
  
  //===========================================================================================
  // "private" functions
  //===========================================================================================
  
  //-------------------------------------------------------------------------------------------
  //_enableAllButtons
  //-------------------------------------------------------------------------------------------
  Thunderjack.HandButtons.prototype._enableAllButtons = function() {
    for (var s_id in this._handButtonsById) {
      var button = this._handButtonsById[s_id];
      button.setEnabled(true);
    }
  };
  
  //-------------------------------------------------------------------------------------------
  //_getLoneOnButton
  //-------------------------------------------------------------------------------------------
  Thunderjack.HandButtons.prototype._getLoneOnButton = function() {
    var s_onButtonId = null;
    for (var s_id in this._handButtonsById) {
      var button = this._handButtonsById[s_id];
      if (button.getIsOn()) {
        if (s_onButtonId !== null) {
          return(null); //a different button is already enabled, no lone on button is available
        }
        s_onButtonId = s_id;
      }
    }
    return(s_onButtonId);
  };
  
  //-------------------------------------------------------------------------------------------
  //_init
  //-------------------------------------------------------------------------------------------
  Thunderjack.HandButtons.prototype._init = function(gamePlayUi) {
    var canvas = this.gamePlayUi.getCanvas();
    this._initHandButton(Thunderjack.HandButtonIds.LEFT, Thunderjack.PlayerHandIds.LOWER_LEFT,
        canvas.fHand_button_1, true);
    this._initHandButton(Thunderjack.HandButtonIds.MIDDLE, Thunderjack.PlayerHandIds.LOWER_MIDDLE,
        canvas.fHand_button_2);
    this._initHandButton(Thunderjack.HandButtonIds.RIGHT, Thunderjack.PlayerHandIds.LOWER_RIGHT,
        canvas.fHand_button_3);
    
    this._updateButtons();
    this._updateSelectedHands();
  };
  
  //-------------------------------------------------------------------------------------------
  //_initHandButton
  //-------------------------------------------------------------------------------------------
  Thunderjack.HandButtons.prototype._initHandButton = function(s_handButtonId, s_playerHandId, handButtonPrefab,
  b_isOn) {
    var handButton = new Thunderjack.HandButton(s_handButtonId, s_playerHandId, handButtonPrefab);
    handButton.setIsOn(b_isOn === true);
    handButton.callbackSignal.add(this._onHandButtonPressed, this);
    
    this._handButtonsById[s_handButtonId] = handButton; 
  };
  
  //-------------------------------------------------------------------------------------------
  //_onHandButtonPressed
  //-------------------------------------------------------------------------------------------
  Thunderjack.HandButtons.prototype._onHandButtonPressed = function(s_id) {
    this._updateSelectedHands();
    this._updateButtons();
  };
  
  //-------------------------------------------------------------------------------------------
  //_updateButtons
  //-------------------------------------------------------------------------------------------
  Thunderjack.HandButtons.prototype._updateButtons = function() {
    var s_loneOnButton = this._getLoneOnButton();
    if (s_loneOnButton !== null) {
      var button = this._handButtonsById[s_loneOnButton];
      button.setEnabled(false);
    } else {
      this._enableAllButtons();
    }
  };
  
  //-------------------------------------------------------------------------------------------
  //_updateSelectedHands
  //-------------------------------------------------------------------------------------------
  Thunderjack.HandButtons.prototype._updateSelectedHands = function() {
    for (var s_id in this._handButtonsById) {
      var button = this._handButtonsById[s_id];
      if (button.getIsOn()) {
        this.selectedHands[s_id] = true;
      } else if (s_id in this.selectedHands) {
        delete this.selectedHands[s_id];
      }
    }
  };
})(window);