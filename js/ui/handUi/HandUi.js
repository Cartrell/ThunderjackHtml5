(function(global) {
  global.Thunderjack = global.Thunderjack || {};
  Thunderjack.HandUi = Thunderjack.HandUi || {};
  
  //===========================================================================================
  // "public"
  //===========================================================================================
  
  //-------------------------------------------------------------------------------------------
  //ctor
  //-------------------------------------------------------------------------------------------
  Thunderjack.HandUi = function(hand_prefab) {
    this._handPrefab = hand_prefab;
    this._cardPositions = [];
    this._scoreBmpText = null;
    
    this._initCardPositions();
    this._initResultLabel();
    this._initTextFields();
  };
  
  //-------------------------------------------------------------------------------------------
  // getCardPositionAt
  //-------------------------------------------------------------------------------------------
  Thunderjack.HandUi.prototype.getCardPositionAt = function(i_index) {
    return(this._cardPositions[i_index]);
  };
  
  //-------------------------------------------------------------------------------------------
  // hideResultsLabel
  //-------------------------------------------------------------------------------------------
  Thunderjack.HandUi.prototype.hideResultsLabel = function() {
    this._handPrefab.fResult_label.visible = false;
  };
  
  //-------------------------------------------------------------------------------------------
  // setScore
  //-------------------------------------------------------------------------------------------
  Thunderjack.HandUi.prototype.setScore = function(i_score) {
    this._scoreBmpText.text().text = i_score > 0 ? i_score : "";
    this._scoreBmpText.text().visible = true;
  };
  
  //-------------------------------------------------------------------------------------------
  // showAnimationLabel
  //-------------------------------------------------------------------------------------------
  Thunderjack.HandUi.prototype.showAnimationLabel = function(s_resultLabelFrame) {
    var labelSprite = this._handPrefab.fResult_label;
    labelSprite.visible = true;
    labelSprite.animations.play(s_resultLabelFrame);
  };
  
  //-------------------------------------------------------------------------------------------
  // showResultsLabel
  //-------------------------------------------------------------------------------------------
  Thunderjack.HandUi.prototype.showResultsLabel = function(s_resultLabelFrame) {
    var labelSprite = this._handPrefab.fResult_label;
    labelSprite.visible = true;
    labelSprite.frameName = s_resultLabelFrame;
  };
  
  //===========================================================================================
  // "protected"
  //===========================================================================================

  //-------------------------------------------------------------------------------------------
  //_initBitmapText
  //-------------------------------------------------------------------------------------------
  Thunderjack.HandUi.prototype._initBitmapText = function(areaNodeSprite, b_visible) {
    var bitmapText = new Thunderjack.BitmapText(this._handPrefab.game, areaNodeSprite);
    bitmapText.text().visible = b_visible === undefined ? true : b_visible;
    return(bitmapText);
  };
  
  //-------------------------------------------------------------------------------------------
  //_cTextFields
  //-------------------------------------------------------------------------------------------
  Thunderjack.HandUi.prototype._initTextFields = function() {
    this._scoreBmpText = this._initBitmapText(this._handPrefab.fScoreTextNode, false);
  };
  
  //===========================================================================================
  // "private"
  //===========================================================================================
  
  //-------------------------------------------------------------------------------------------
  // _initCardPosition
  //-------------------------------------------------------------------------------------------
  Thunderjack.HandUi.prototype._initCardPosition = function(s_cardNodeName) {
    var cardNode = this._handPrefab.getByName(s_cardNodeName);
    var position = new Phaser.Point(this._handPrefab.x + cardNode.x, this._handPrefab.y + cardNode.y);
    this._cardPositions.push(position);
    
    var SHOULD_DESTROY = true;
    var IS_SILENT = true;
    this._handPrefab.remove(cardNode, SHOULD_DESTROY, IS_SILENT);
  };

  //-------------------------------------------------------------------------------------------
  // _initCardPositions
  //-------------------------------------------------------------------------------------------
  Thunderjack.HandUi.prototype._initCardPositions = function() {
    this._initCardPosition("m_cardNode0");
    this._initCardPosition("m_cardNode1");
    this._initCardPosition("m_cardNode2");
    this._initCardPosition("m_cardNode3");
    this._initCardPosition("m_cardNode4");
    this._initCardPosition("m_cardNode5");
  };
  
  //-------------------------------------------------------------------------------------------
  //_initResultLabel
  //-------------------------------------------------------------------------------------------
  Thunderjack.HandUi.prototype._initResultLabel = function() {
    this._handPrefab.fResult_label.visible = false;
  };
})(window);