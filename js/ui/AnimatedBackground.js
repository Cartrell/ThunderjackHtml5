(function(global) {
  global.Thunderjack = global.Thunderjack || {};
  Thunderjack.AnimatedBackground = Thunderjack.AnimatedBackground || {};

  //===========================================================================================
  // "public"
  //===========================================================================================
  
  //-------------------------------------------------------------------------------------------
  //ctor
  //-------------------------------------------------------------------------------------------
  Thunderjack.AnimatedBackground = function(game, backgroundSprite) {
    this._game = game;
    this._backgroundSprite = backgroundSprite;
    this._timer = null;
    
    //array: return value of Phaser.Color.HSVColorWheel
    this._hsvColorWheel = this._initColorWheel();
    this._hueIndex = Math.floor(Math.random() * this._hsvColorWheel.length);
    
    this._updateBackground();
  };
  
  //-------------------------------------------------------------------------------------------
  //dispose
  //-------------------------------------------------------------------------------------------
  Thunderjack.AnimatedBackground.prototype.dispose = function() {
    if (this._timer) {
      this._timer.destroy();
      this._timer = null;
    }
  };
  
  //-------------------------------------------------------------------------------------------
  //start
  //-------------------------------------------------------------------------------------------
  Thunderjack.AnimatedBackground.prototype.start = function() {
    var DELAY = Phaser.Timer.SECOND;
    this._timer = this._game.time.create();
    this._timer.loop(DELAY, this._onUpdateTimer, this);
    this._timer.start();
  };
  
  //===========================================================================================
  // "private"
  //===========================================================================================
  
  //-------------------------------------------------------------------------------------------
  //_initColorWheel
  //-------------------------------------------------------------------------------------------
  Thunderjack.AnimatedBackground.prototype._initColorWheel = function() {
    return(Phaser.Color.HSVColorWheel());
  };
  
  //-------------------------------------------------------------------------------------------
  //_onUpdateTimer
  //-------------------------------------------------------------------------------------------
  Thunderjack.AnimatedBackground.prototype._onUpdateTimer = function() {
    this._hueIndex = (this._hueIndex + 1) % this._hsvColorWheel.length;
    this._updateBackground();
  };
  
  //-------------------------------------------------------------------------------------------
  //_updateBackground
  //-------------------------------------------------------------------------------------------
  Thunderjack.AnimatedBackground.prototype._updateBackground = function() {
    var colorObject = this._hsvColorWheel[this._hueIndex];
    this._backgroundSprite.tint = Phaser.Color.getColor(colorObject.r, colorObject.g, colorObject.b);
  };
})(window);