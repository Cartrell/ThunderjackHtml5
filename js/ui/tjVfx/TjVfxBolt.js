(function(global) {
  global.Thunderjack = global.Thunderjack || {};
  Thunderjack.TjVfxBolt = Thunderjack.TjVfxBolt || {};
  
  //===========================================================================================
  // ctor
  //===========================================================================================
  Thunderjack.TjVfxBolt = function(game, boltSprite) {
    this._timerEvent = null;
    this._boltSprite = boltSprite;
    this._numTimerRepeatsRemaining = 0;
    this._createTimer(game);
  };
  
  //===========================================================================================
  // "private" functions
  //===========================================================================================
  
  //-------------------------------------------------------------------------------------------
  // _createTimer
  //-------------------------------------------------------------------------------------------
  Thunderjack.TjVfxBolt.prototype._createTimer = function(game) {
    var NUM_FLASHES = 7;
    var REPEAT_COUNT = NUM_FLASHES * 2;
    
    this._numTimerRepeatsRemaining = REPEAT_COUNT;
    
    var DELAY = 21;
    var timer = game.time.create();
    this._timerEvent = timer.repeat(DELAY, REPEAT_COUNT, this._onBoltTimer, this);
    timer.start();
  };
  
  //-------------------------------------------------------------------------------------------
  // _onBoltTimer
  //-------------------------------------------------------------------------------------------
  Thunderjack.TjVfxBolt.prototype._onBoltTimer = function() {
    this._boltSprite.visible = !this._boltSprite.visible;
    
    if (--this._numTimerRepeatsRemaining === 0) {
      this._boltSprite.visible = false;
    } else if (this._boltSprite.visible) {
      this._tintBolt();
    }
  };
  
  //-------------------------------------------------------------------------------------------
  // _tintBolt
  //-------------------------------------------------------------------------------------------
  Thunderjack.TjVfxBolt.prototype._tintBolt = function() {
    var TINT_COLORS = [ 0xffffff, 0xffff00, 0x0080ff, 0xffff00, 0x0080ff ];
    this._boltSprite.tint = Phaser.ArrayUtils.getRandomItem(TINT_COLORS);
  };
})(window);