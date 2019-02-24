(function(global) {
  global.Thunderjack = global.Thunderjack || {};
  Thunderjack.CardValues = Thunderjack.CardValues || {};
  
  //===========================================================================================
  //"static / const"
  //===========================================================================================
  Thunderjack.CardValues.TWO = "2";
  Thunderjack.CardValues.THREE = "3";
  Thunderjack.CardValues.FOUR = "4";
  Thunderjack.CardValues.FIVE = "5";
  Thunderjack.CardValues.SIX = "6";
  Thunderjack.CardValues.SEVEN = "7";
  Thunderjack.CardValues.EIGHT = "8";
  Thunderjack.CardValues.NINE = "9";
  Thunderjack.CardValues.TEN = "10";
  Thunderjack.CardValues.JACK = "j";
  Thunderjack.CardValues.QUEEN = "q";
  Thunderjack.CardValues.KING = "k";
  Thunderjack.CardValues.ACE = "a";
  
  Thunderjack.CardValues.ALL = [
    Thunderjack.CardValues.TWO,
    Thunderjack.CardValues.THREE,
    Thunderjack.CardValues.FOUR,
    Thunderjack.CardValues.FIVE,
    Thunderjack.CardValues.SIX,
    Thunderjack.CardValues.SEVEN,
    Thunderjack.CardValues.EIGHT,
    Thunderjack.CardValues.NINE,
    Thunderjack.CardValues.TEN,
    Thunderjack.CardValues.JACK,
    Thunderjack.CardValues.QUEEN,
    Thunderjack.CardValues.KING,
    Thunderjack.CardValues.ACE
  ];
  
  //key: string (card value)
  //data: integer (card points)
  Thunderjack.CardPoints = { };
  Thunderjack.CardPoints[Thunderjack.CardValues.TWO] = 2;
  Thunderjack.CardPoints[Thunderjack.CardValues.THREE] = 3;
  Thunderjack.CardPoints[Thunderjack.CardValues.FOUR] = 4;
  Thunderjack.CardPoints[Thunderjack.CardValues.FIVE] = 5;
  Thunderjack.CardPoints[Thunderjack.CardValues.SIX] = 6;
  Thunderjack.CardPoints[Thunderjack.CardValues.SEVEN] = 7;
  Thunderjack.CardPoints[Thunderjack.CardValues.EIGHT] = 8;
  Thunderjack.CardPoints[Thunderjack.CardValues.NINE] = 9;
  Thunderjack.CardPoints[Thunderjack.CardValues.TEN] = 10;
  Thunderjack.CardPoints[Thunderjack.CardValues.JACK] = 10;
  Thunderjack.CardPoints[Thunderjack.CardValues.QUEEN] = 10;
  Thunderjack.CardPoints[Thunderjack.CardValues.KING] = 10;
  Thunderjack.CardPoints[Thunderjack.CardValues.ACE] = 1;
})(window);