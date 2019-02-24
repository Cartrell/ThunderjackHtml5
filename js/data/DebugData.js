(function(global) {
  global.Thunderjack = global.Thunderjack || {};
  Thunderjack.DebugData = Thunderjack.DebugData || {};
  
  //===========================================================================================
  //"static / const"
  //===========================================================================================
  
  /*
    This determines the order in which cards are drawn, and can be usefule for testing, instead
    of playing a bazillion reounds to get the card combos you want.
    
    Note that this order of cards is only used on the first round of play.
    
    array data: string that is the card data id
    the format of a card data it is a string: "[value]_[suit]_[deck index]"
    for example: "10_d_1" would be the ten of diamonds from deck 1
    
    Some samples are provided below in comment blocks. Use only one block at a time.
  */
  Thunderjack.DebugData.CardIds = [
    //2 players, first player gets blitz
    /*
    "a_h_0",
    "7_h_0",
    "5_c_0",
    "a_d_0",
    "7_d_0",
    "5_s_0",
    "10_c_0",
    "2_c_0",
    "2_s_0",
    "2_h_0"
    */
    
    //player gets tj, dealer gets bj, next round, player gets bj
    /*
    "k_s_0",
    "j_d_0",
    "a_s_0",
    "a_d_0",
    
    "10_d_0",
    "2_d_0",
    "a_h_0",
    "4_s_0"
    */
    
    /*
    //player gets tj, twice
    "k_s_0",
    "j_d_0",
    "a_s_0",
    "a_d_0",
    
    "10_d_0",
    "2_d_0",
    "a_d_0",
    "4_s_0"
    */
    
    //dealer gets bj vs 1 player
    /*
    "4_d_0",
    "a_d_0",
    "5_h_0",
    "10_s_0"
    */
    
    //bj push vs 1 player
    /*
    "a_c_0",
    "a_d_0",
    "10_h_0",
    "10_s_0"
    */
    
    //bj push vs 2 players
    /*
    "a_c_0",
    "a_d_0",
    "a_h_0",
    "10_h_0",
    "10_s_0",
    "10_d_0"
    */
    
    //bj push vs 3 players
    /*
    "a_c_0",
    "a_d_0",
    "a_h_0",
    "a_s_0",
    "10_h_0",
    "10_s_0",
    "10_d_0",
    "10_c_0"
    */
    
    //bj flushes on 2 player hands
    /*
    "a_s_0",
    "a_h_0",
    "4_d_0",
    "2_s_0",
    
    "k_s_0",
    "q_h_0",
    "9_d_0",
    "10_d_0"
    */
    
    //dealer blitz (bust) vs 1 player
    /*
    "4_c_0",
    "2_h_0",
    "5_h_0",
    "2_d_0",
    "2_c_0",
    "2_s_0",
    "3_d_0",
    "3_h_0"
    */
  ];
  
})(window);