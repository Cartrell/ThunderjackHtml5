(function(global) {
  global.Thunderjack = global.Thunderjack || {};
  Thunderjack.BitmapText = Thunderjack.BitmapText || {};
  
  //===========================================================================================
  // "public"
  //===========================================================================================
  
  //-------------------------------------------------------------------------------------------
  //ctor
  //-------------------------------------------------------------------------------------------
  Thunderjack.BitmapText = function(game, areaNodeSprite) {
    if (!game || !areaNodeSprite) {
      return;
    }
    
    this._game = game;
    this._areaNodeSprite = areaNodeSprite;
    this._areaNodeSprite.visible = false;
    
    var s_text = this._getTextFromNode();
    var s_font = this._getFontFromNode();
    this._bitmapText = this._game.add.bitmapText(this._areaNodeSprite.x, this._areaNodeSprite.y,
      s_font, s_text, this._areaNodeSprite.height, this._areaNodeSprite.parent);
    
    this._alignText();
  };
  
  //-------------------------------------------------------------------------------------------
  // setText
  //-------------------------------------------------------------------------------------------
  Thunderjack.BitmapText.prototype.setText = function(value) {
    if (this._bitmapText) {
      this._bitmapText.text = value;
      this._alignText();
    }
  };
  
  //-------------------------------------------------------------------------------------------
  // text
  //-------------------------------------------------------------------------------------------
  Thunderjack.BitmapText.prototype.text = function() {
    return(this._bitmapText);
  };
  
  //===========================================================================================
  // "private"
  //===========================================================================================
  
  //-------------------------------------------------------------------------------------------
  //_alignText
  //-------------------------------------------------------------------------------------------
  Thunderjack.BitmapText.prototype._alignText = function() {
    this._alignTextHz();
    this._alignTextVt();
  };
  
  //-------------------------------------------------------------------------------------------
  //_alignTextHz
  //-------------------------------------------------------------------------------------------
  Thunderjack.BitmapText.prototype._alignTextHz = function() {
    var s_align = this._getAlignFromNode();
    if (s_align === "center") {
      this._bitmapText.x = this._areaNodeSprite.x +
        (this._areaNodeSprite.width - this._bitmapText.width) / 2;
    } else if (s_align === "right") {
      this._bitmapText.x = this._areaNodeSprite.right - this._bitmapText.width; 
    } else {
      this._bitmapText.x = this._areaNodeSprite.x;
    }
  };
  
  //-------------------------------------------------------------------------------------------
  //_alignTextVt
  //-------------------------------------------------------------------------------------------
  Thunderjack.BitmapText.prototype._alignTextVt = function() {
    if (this._isValign()) {
      this._bitmapText.y = this._areaNodeSprite.y +
        (this._areaNodeSprite.height - this._bitmapText.height) / 2;
    } else {
      this._bitmapText.y = this._areaNodeSprite.y;
    }
  };
  
  //-------------------------------------------------------------------------------------------
  //_getAlignFromNode
  //-------------------------------------------------------------------------------------------
  Thunderjack.BitmapText.prototype._getAlignFromNode = function() {
    return(this._getDataPropertyFromNode("align", "left"));
  };
  
  //-------------------------------------------------------------------------------------------
  //_getDataPropertyFromNode
  //-------------------------------------------------------------------------------------------
  Thunderjack.BitmapText.prototype._getDataPropertyFromNode = function(s_propertyName,
  defaultValue) {
    var data = this._areaNodeSprite.data;
    return(data && s_propertyName in data ? data[s_propertyName] : defaultValue);
  };
  
  //-------------------------------------------------------------------------------------------
  //_getFontFromNode
  //-------------------------------------------------------------------------------------------
  Thunderjack.BitmapText.prototype._getFontFromNode = function() {
    return(this._getDataPropertyFromNode("font"));
  };
  
  //-------------------------------------------------------------------------------------------
  //_getTextFromNode
  //-------------------------------------------------------------------------------------------
  Thunderjack.BitmapText.prototype._getTextFromNode = function() {
    return(this._getDataPropertyFromNode("text", ""));
  };
  
  //-------------------------------------------------------------------------------------------
  //_isValign
  //-------------------------------------------------------------------------------------------
  Thunderjack.BitmapText.prototype._isValign = function(b_default) {
    return(this._getDataPropertyFromNode("valign", b_default === undefined ? false : b_default));
  };
})(window);