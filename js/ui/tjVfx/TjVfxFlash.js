(function(global) {
  global.Thunderjack = global.Thunderjack || {};
  Thunderjack.TjVfxFlash = Thunderjack.TjVfxFlash || {};
  
  //===========================================================================================
  // ctor
  //===========================================================================================
  Thunderjack.TjVfxFlash = function(game) {
    this._timerEvent = null;
    this._flashDisplay = this._createFlashDisplay(game);
    this._numTimerRepeatsRemaining = 0;
    this._createTimer(game);
  };
  
  //===========================================================================================
  // "private" functions
  //===========================================================================================
  
  //-------------------------------------------------------------------------------------------
  // _createFlashDisplay
  //-------------------------------------------------------------------------------------------
  Thunderjack.TjVfxFlash.prototype._createFlashDisplay = function(game) {
    var COLOR = 0xffffff;
    var flashDisplay = game.add.graphics(0, 0);
    flashDisplay.visible = false;
    flashDisplay.beginFill(COLOR);
    flashDisplay.drawRect(0, 0, game.width, game.height);
    flashDisplay.endFill();
    return(flashDisplay);
  };
  
  //-------------------------------------------------------------------------------------------
  // _createTimer
  //-------------------------------------------------------------------------------------------
  Thunderjack.TjVfxFlash.prototype._createTimer = function(game) {
    var NUM_FLASHES = 5;
    var REPEAT_COUNT = NUM_FLASHES * 2;
    
    this._numTimerRepeatsRemaining = REPEAT_COUNT;
    
    var DELAY = 18;
    var timer = game.time.create();
    this._timerEvent = timer.repeat(DELAY, REPEAT_COUNT, this._onFlashTimer, this);
    timer.start();
  };
  
  //-------------------------------------------------------------------------------------------
  // _onFlashTimer
  //-------------------------------------------------------------------------------------------
  Thunderjack.TjVfxFlash.prototype._onFlashTimer = function() {
    this._flashDisplay.visible = !this._flashDisplay.visible;
    
    if (--this._numTimerRepeatsRemaining === 0) {
      this._flashDisplay.destroy();
      this._flashDisplay = null;
    }
  };  
})(window);