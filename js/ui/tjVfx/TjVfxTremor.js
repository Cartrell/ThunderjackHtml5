(function(global) {
  global.Thunderjack = global.Thunderjack || {};
  Thunderjack.TjVfxTremor = Thunderjack.TjVfxTremor || {};
  
  //===========================================================================================
  // ctor
  //===========================================================================================
  Thunderjack.TjVfxTremor = function(game) {
    var INTENSITY = 0.005;
    var DURATION = 350;
    game.camera.shake(INTENSITY, DURATION);
  };
})(window);