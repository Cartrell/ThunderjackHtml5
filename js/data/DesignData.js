(function(global) {
  global.Thunderjack = global.Thunderjack || {};
  Thunderjack.DesignData = Thunderjack.DesignData || {};
  
  //===========================================================================================
  //"static / const"
  //===========================================================================================
  
  //number of decks being used
  Thunderjack.DesignData.NUM_DECKS = 4;
  
  //ratio threshold of cards remaining until deck is recycled
  Thunderjack.DesignData.RECYCLE_DECK_RATIO = 0.40;
  
  //number of credits the player starts with
  Thunderjack.DesignData.PLAYER_STARTING_CREDITS = 500;
  
  //duration, in seconds, of a card being dealt
  Thunderjack.DesignData.CARD_DEAL_DURATION_SECS = 0.35;
  
  //rate, in seconds, at which cards are dealt when multiple cards are being dealt in succession
  Thunderjack.DesignData.CARD_DEAL_RATE_SECS = 0.25;
  
  //duration, in seconds, at which cards are discarded
  Thunderjack.DesignData.CARD_DISCARD_RECYCLE_DURATION_SECS = 0.10;
  
  //rate, in seconds, at which cards are discarded and recycled
  Thunderjack.DesignData.CARD_DISCARD_RECYCLE_RATE_SECS = 0.08;
  
  //blackjack points
  Thunderjack.DesignData.BLACKJACK_POINTS = 21;
  
  //dealer will hit as long as points are lower than this value
  Thunderjack.DesignData.DEALER_HIT_THRESHOLD = 17;
  
  //number of cards in hand to get a blitz
  Thunderjack.DesignData.NUM_CARDS_FOR_BLITZ = 6;
  
  //player wins by blackjack
  Thunderjack.DesignData.WIN_RATIO_BLACKJACK = 3 / 2;
  
  //player wins by blitz
  Thunderjack.DesignData.WIN_RATIO_BLITZ = 5 / 1;
  
  //player wins by dealer bust
  Thunderjack.DesignData.WIN_RATIO_BUST = 1 / 1;
  
  //player wins by thunderjack!
  Thunderjack.DesignData.WIN_RATIO_THUNDERJACK = 3 / 1;
  
  //player wins by beating dealer
  Thunderjack.DesignData.WIN_RATIO_WIN = 1 / 1;
  
  //player wins by beating dealer
  Thunderjack.DesignData.WIN_RATIO_SURRENDER = -1 / 2;
  
  //atlas and assets
  Thunderjack.DesignData.ALTAS_MAIN = "ui1";
  Thunderjack.DesignData.FONT_THE_BOLD_FONT = "theboldfont";
  Thunderjack.DesignData.FONT_THE_BOLD_FONT_WIN = "theboldfont_win";
  
  //win sounds
  Thunderjack.DesignData.WIN_SOUND_KEYS = [
    "snd_win01_12", "snd_win02_12", "snd_win03_12", "snd_win04_12", "snd_win05_12", "snd_win06_12",
    "snd_win07_12","snd_win08_12", "snd_win09_12", "snd_win10_12", "snd_win11_12", "snd_win12_12" 
  ];
  
})(window);