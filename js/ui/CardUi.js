(function(global) {
  global.Thunderjack = global.Thunderjack || {};
  Thunderjack.CardUi = Thunderjack.CardUi || {};
  
  //===========================================================================================
  //"public"
  //===========================================================================================
  
  //===========================================================================================
  //ctor
  //===========================================================================================
  Thunderjack.CardUi = function(cardData, game) {
    this.cardData = cardData;
    this.game = game;
    this.image = this._createImage();
  };
  
  //-------------------------------------------------------------------------------------------
  //dispose
  //-------------------------------------------------------------------------------------------
  Thunderjack.CardUi.prototype.dispose = function () {
    this.cardData = null;
    if (this.image) {
      this.image.destroy();
      this.image = null;
    }
  };
  
  //-------------------------------------------------------------------------------------------
  //isFaceUp
  //-------------------------------------------------------------------------------------------
  Thunderjack.CardUi.prototype.isFaceUp = function(b_value) {
    if (b_value !== undefined && b_value !== this.cardData.isFaceUp) {
      this.cardData.isFaceUp = b_value == true;
      this._updateImage();
    }
    
    return(this.cardData.isFaceUp);
  };
  
  //===========================================================================================
  //"private"
  //===========================================================================================

  //-------------------------------------------------------------------------------------------
  //_createImage
  //-------------------------------------------------------------------------------------------
  Thunderjack.CardUi.prototype._createImage = function () {
    var ATLAS_KEY = "cards"; 
    var FRAME = getImageFrameName(this.cardData);
    var cardImage = this.game.make.image(0, 0, ATLAS_KEY, FRAME);
    cardImage.cardUi = this;
    return(cardImage);
  };
  
  //-------------------------------------------------------------------------------------------
  //_updateImage
  //-------------------------------------------------------------------------------------------
  Thunderjack.CardUi.prototype._updateImage = function () {
    if (this.image) {
      this.image.frameName = getImageFrameName(this.cardData);
    }
  };
  
  //===========================================================================================
  //local
  //===========================================================================================
  
  //-------------------------------------------------------------------------------------------
  //buildFaceUpCardFrameName
  //-------------------------------------------------------------------------------------------
  function buildFaceUpCardFrameName(cardData) {
    var CARD_FRAME_PFX = "card_";
    return(CARD_FRAME_PFX + cardData.value + cardData.suit);
  }
  
  //-------------------------------------------------------------------------------------------
  //getImageFrameName
  //-------------------------------------------------------------------------------------------
  function getImageFrameName(cardData) {
    var CARD_BACK_FRAME_NAME = "card_back_red"; 
    return(cardData.isFaceUp ?
      buildFaceUpCardFrameName(cardData) :
      CARD_BACK_FRAME_NAME);
  }
})(window);