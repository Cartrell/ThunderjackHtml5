(function(global) {
  global.Thunderjack = global.Thunderjack || {};
  Thunderjack.PlayerHandUi = Thunderjack.PlayerHandUi || {};
  
  //===========================================================================================
  // "public"
  //===========================================================================================
  
  //-------------------------------------------------------------------------------------------
  //ctor
  //-------------------------------------------------------------------------------------------
  Thunderjack.PlayerHandUi = function(hand_prefab) {
    this._scoreBmpText = null;
    this._winAmountBmpText = null;
    this._betChips = [];
    this._betChipStartPosition = null; //Phaser.Point
    this._betChipOffset = 0;
    
    Thunderjack.HandUi.call(this, hand_prefab);
    
    this._initBetChips();
    this.hideAmountWon();
    this.setTurnIndicatorVisible(false);
  };
  
  //===========================================================================================
  // inherit
  //===========================================================================================
  Thunderjack.PlayerHandUi.prototype = Object.create(Thunderjack.HandUi.prototype);
  Thunderjack.PlayerHandUi.prototype.constructor = Thunderjack.PlayerHandUi; 
  
  //===========================================================================================
  // "static / const"
  //===========================================================================================
  Thunderjack.PlayerHandUi._TURN_ARROW_ANIMATION_NAME = "present";
  
  //===========================================================================================
  // "public"
  //===========================================================================================
  
  //-------------------------------------------------------------------------------------------
  // hideAmountWon
  //-------------------------------------------------------------------------------------------
  Thunderjack.PlayerHandUi.prototype.hideAmountWon = function() {
    this._handPrefab.fWinAmountGroup.visible = false;
  };
  
  //-------------------------------------------------------------------------------------------
  // setBetValue
  //-------------------------------------------------------------------------------------------
  Thunderjack.PlayerHandUi.prototype.setBetValue = function(i_betValue) {
    this._setBetText(i_betValue > 0 ? i_betValue.toString() : "");
    this._addBetChipsForValue(i_betValue);
  };
  
  //-------------------------------------------------------------------------------------------
  // setTurnIndicatorVisible
  //-------------------------------------------------------------------------------------------
  Thunderjack.PlayerHandUi.prototype.setTurnIndicatorVisible = function(b_visible) {
    var indicator = this._handPrefab.fTurn_indicator_arrow; 
    indicator.visible = b_visible;
    if (b_visible) {
      indicator.animations.play(Thunderjack.PlayerHandUi._TURN_ARROW_ANIMATION_NAME);
    }
  };

  //-------------------------------------------------------------------------------------------
  // showAmountWon
  //-------------------------------------------------------------------------------------------
  Thunderjack.PlayerHandUi.prototype.showAmountWon = function(n_amountWon) {
    this._handPrefab.fWinAmountGroup.visible = true;
    this._winAmountBmpText.setText(n_amountWon);
  };
  
  //===========================================================================================
  // "protected"
  //===========================================================================================

  //-------------------------------------------------------------------------------------------
  //_initTextFields
  //-------------------------------------------------------------------------------------------
  Thunderjack.PlayerHandUi.prototype._initTextFields = function() {
    Thunderjack.HandUi.prototype._initTextFields.call(this); //call base method on this instance
    this._initBetValueTextField();
    this._initWinAmountTextField();
  };
  
  //===========================================================================================
  // "private"
  //===========================================================================================
  
  //-------------------------------------------------------------------------------------------
  // _addBetChip
  //-------------------------------------------------------------------------------------------
  Thunderjack.PlayerHandUi.prototype._addBetChip = function(s_betChipId) {
    var betChipData = Thunderjack.BetChipsData.Blocks[s_betChipId];
    
    var betChipImage = this._handPrefab.game.add.image(
      this._betChipStartPosition.x + this._betChipOffset * this._betChips.length,
      this._betChipStartPosition.y,
      'ui1',
      betChipData.betChipFrame,
      this._handPrefab);
    
    this._betChips.push(betChipImage);
  };
  
  //-------------------------------------------------------------------------------------------
  // _addBetChipsForValue
  //-------------------------------------------------------------------------------------------
  Thunderjack.PlayerHandUi.prototype._addBetChipsForValue = function(i_betValue) {
    this._removeAllBetChips();
    
    var chipsMaker = new Thunderjack.BetChipsMaker();
    var as_betChipIds = chipsMaker.getChipIdsFor(i_betValue);
    for (var i_index = 0; i_index < as_betChipIds.length; i_index++) {
      var s_betChipId = as_betChipIds[i_index];
      this._addBetChip(s_betChipId);
    } 
  };
  
  //-------------------------------------------------------------------------------------------
  //_initBetChips
  //-------------------------------------------------------------------------------------------
  Thunderjack.PlayerHandUi.prototype._initBetChips = function() {
    var chipMainNode = this._handPrefab.getByName("m_chipMainNode");
    this._betChipStartPosition = new Phaser.Point(chipMainNode.x, chipMainNode.y);
    
    var chipOffsetNode = this._handPrefab.getByName("m_chipOffsetNode");
    this._betChipOffset = chipOffsetNode.x - chipMainNode.x;
    
    var SHOULD_DESTROY = true;
    var IS_SILENT = true;
    this._handPrefab.remove(chipMainNode, SHOULD_DESTROY, IS_SILENT);
    this._handPrefab.remove(chipOffsetNode, SHOULD_DESTROY, IS_SILENT);
  };
  
  //-------------------------------------------------------------------------------------------
  //_initBetValueTextField
  //-------------------------------------------------------------------------------------------
  Thunderjack.HandUi.prototype._initBetValueTextField = function() {
    this._betValueBmpText = this._initBitmapText(this._handPrefab.fBetTextNode, false);
  };
  
  //-------------------------------------------------------------------------------------------
  //_initWinAmountTextField
  //-------------------------------------------------------------------------------------------
  Thunderjack.PlayerHandUi.prototype._initWinAmountTextField = function() {
    this._winAmountBmpText = this._initBitmapText(this._handPrefab.fWinAmountTextNode);
  };
  
  //-------------------------------------------------------------------------------------------
  // _removeAllBetChips
  //-------------------------------------------------------------------------------------------
  Thunderjack.PlayerHandUi.prototype._removeAllBetChips = function() {
    for (var i_index = 0; i_index < this._betChips.length; i_index++) {
      var betChipImage = this._betChips[i_index];
      betChipImage.destroy();
    }
    this._betChips.length = 0;
  };
  
  //-------------------------------------------------------------------------------------------
  // _setBetText
  //-------------------------------------------------------------------------------------------
  Thunderjack.PlayerHandUi.prototype._setBetText = function(value) {
    this._betValueBmpText.text().text = value;
    this._betValueBmpText.text().visible = true;
  };
})(window);