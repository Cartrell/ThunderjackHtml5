window.onload = function() {
	this.Thunderjack = this.Thunderjack || { };
	
  var game = new Phaser.Game(1024, 768, Phaser.AUTO);

  game.state.add("Boot", Boot);
	game.state.add("Preload", Preload);
	game.state.add("Intro", Intro);
	game.state.add("GamePlay", GamePlay);

	game.state.start("Boot");
};
