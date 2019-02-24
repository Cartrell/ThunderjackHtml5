(function(global) {
  global.Thunderjack = global.Thunderjack || {};
  Thunderjack.CalcScore = Thunderjack.CalcScore || {};
  
  //===========================================================================================
  //"static / const"
  //===========================================================================================
  Thunderjack.CalcScore._ACE_POINTS_REMAINING = 10;
  
  //===========================================================================================
  //"publie"
  //===========================================================================================
  
  //-------------------------------------------------------------------------------------------
  //Eval
  //-------------------------------------------------------------------------------------------
  Thunderjack.CalcScore.Eval = function (a_cardData) {
    var i_numCards = Array.isArray(a_cardData) ? a_cardData.length : 0;
    if (i_numCards == 0) {
      return(0);
    }
    
    var i_points = 0;
    var b_containsAnAce = false;
    
    for (var i_index = 0; i_index < i_numCards; i_index++) {
      var o_cardData = a_cardData[i_index];
      if (!o_cardData) {
        continue; //sanity check
      }
      
      i_cardPoints = Thunderjack.CardPoints[o_cardData.value];
      if (!i_cardPoints) {
        continue; //invalid card value
      }
      
      if (o_cardData.value == Thunderjack.CardValues.ACE) {
        b_containsAnAce = true;
      }
      
      i_points += i_cardPoints;
    }
    
    if (b_containsAnAce) {
      var i_proposedValue = i_points + Thunderjack.CalcScore._ACE_POINTS_REMAINING;
      if (i_proposedValue <= Thunderjack.DesignData.BLACKJACK_POINTS) {
        i_points = i_proposedValue;
      }
    }
    
    return(i_points);
  };
  
})(window);