(function(global) {
  global.Thunderjack = global.Thunderjack || {};
  Thunderjack.CardMatcher = Thunderjack.CardMatcher || {};
  
  //===========================================================================================
  //"public"
  //===========================================================================================
  
  //-------------------------------------------------------------------------------------------
  //ctor
  //-------------------------------------------------------------------------------------------
  Thunderjack.CardMatcher = function () {
  };
  
  //-------------------------------------------------------------------------------------------
  //getPlayerHandsWithBlackjack
  //-------------------------------------------------------------------------------------------
  Thunderjack.CardMatcher.prototype.getPlayerHandsWithBlackjack = function (a_playerHands) {
    var a_bjPlayerHands = [];
    for (var i_index = 0; i_index < a_playerHands.length; i_index++) {
      var hand = a_playerHands[i_index];
      if (hasBlackjack(hand)) {
        a_bjPlayerHands.push(hand);
      }
    }
    return(a_bjPlayerHands);
  };
  
  //-------------------------------------------------------------------------------------------
  //getPlayerHandsWithThunderjack
  //-------------------------------------------------------------------------------------------
  Thunderjack.CardMatcher.prototype.getPlayerHandsWithThunderjack = function (a_playerHands) {
    var a_tjPlayerHands = [];
    for (var i_index = 0; i_index < a_playerHands.length; i_index++) {
      var hand = a_playerHands[i_index];
      if (hasThunderjack(hand)) {
        a_tjPlayerHands.push(hand);
      }
    }
    return(a_tjPlayerHands);
  };
  
  //-------------------------------------------------------------------------------------------
  //hasBlitz
  //-------------------------------------------------------------------------------------------
  Thunderjack.CardMatcher.prototype.hasBlitz = function(playerHand) {
    return(playerHand &&
        playerHand.getNumCards() === Thunderjack.DesignData.NUM_CARDS_FOR_BLITZ &&
        playerHand.score <= Thunderjack.DesignData.BLACKJACK_POINTS);        
  };
  
  //-------------------------------------------------------------------------------------------
  //hasPairOf
  //-------------------------------------------------------------------------------------------
  Thunderjack.CardMatcher.prototype.hasPairOf = function(playerHandData, u_cardValue) {
    return(areCardsPair(playerHandData) &&
      playerHandData.getCardAt(0).value === u_cardValue);
  };
  
  //-------------------------------------------------------------------------------------------
  //isDoubleEligible
  //-------------------------------------------------------------------------------------------
  Thunderjack.CardMatcher.prototype.isDoubleEligible = function (playerHandData) {
    return(isOpeningHand(playerHandData));
  };
  
  //-------------------------------------------------------------------------------------------
  //isSplitEligible
  //-------------------------------------------------------------------------------------------
  Thunderjack.CardMatcher.prototype.isSplitEligible = function (playerHandData) {
    return(!playerHandData.hasSplit &&
        isOpeningHand(playerHandData) &&
        areCardsPair(playerHandData));
  };
  
  //-------------------------------------------------------------------------------------------
  //isSurrenderEligible
  //-------------------------------------------------------------------------------------------
  Thunderjack.CardMatcher.prototype.isSurrenderEligible = function (playerHandData) {
    return(isOpeningHand(playerHandData));
  };
  
  //===========================================================================================
  //local
  //===========================================================================================
  
  //-------------------------------------------------------------------------------------------
  //areCardsPair
  //-------------------------------------------------------------------------------------------
  function areCardsPair(hand) {
    if (!hand || hand.getNumCards() != 2) {
      return(false);
    }
    
    var cardData0 = hand.getCardAt(0);
    var cardData1 = hand.getCardAt(1);
    return(cardData0 && cardData1 && cardData0.value == cardData1.value);
  }
  
  //-------------------------------------------------------------------------------------------
  //hasBlackjack
  //-------------------------------------------------------------------------------------------
  function hasBlackjack(hand) {
    return(isOpeningHand(hand) &&
        hand.score === Thunderjack.DesignData.BLACKJACK_POINTS);
  }
  
  //-------------------------------------------------------------------------------------------
  //hasThunderjack
  //-------------------------------------------------------------------------------------------
  function hasThunderjack(hand) {
    return(hasBlackjack(hand) &&
        isFlush(hand));
  }
  
  //-------------------------------------------------------------------------------------------
  //isFlush
  //-------------------------------------------------------------------------------------------
  function isFlush(hand) {
    var s_cardSuit = undefined;
    for (var i_index = 0; i_index < hand.getNumCards(); i_index++) {
      var cardData = hand.getCardAt(i_index);
      if (s_cardSuit === undefined) {
        s_cardSuit = cardData.suit;
      } else if (s_cardSuit !== cardData.suit) {
        return(false);
      } 
    }
    return(s_cardSuit !== undefined);
  }
  
  //-------------------------------------------------------------------------------------------
  //isOpeningHand
  //-------------------------------------------------------------------------------------------
  function isOpeningHand(hand) {
    var NUM_CARDS_IN_OPENING_HAND = 2;
    return(hand && hand.getNumCards() === NUM_CARDS_IN_OPENING_HAND);
  }
})(window);