(function(global) {
  global.Thunderjack = global.Thunderjack || {};
  Thunderjack.DeckUi = Thunderjack.DeckUi || {};
  
  //===========================================================================================
  //"public"
  //===========================================================================================
  
  //===========================================================================================
  //ctor
  //===========================================================================================
  Thunderjack.DeckUi = function(deckPrefabGroup) {
    //data: Phaser.Sprite
    this.cards = [];
    this._group = deckPrefabGroup;
    this._init();
  };
  
  //-------------------------------------------------------------------------------------------
  //getGroup
  //-------------------------------------------------------------------------------------------
  Thunderjack.DeckUi.prototype.getGroup = function() {
    return(this._group);
  };
  
  //-------------------------------------------------------------------------------------------
  //setVisibleRatio
  //-------------------------------------------------------------------------------------------
  Thunderjack.DeckUi.prototype.setVisibleRatio = function(n_ratio) {
    if (typeof(n_ratio) !== 'number') {
      return;
    }
    
    var n_adjRatio = this._group.game.math.clamp(n_ratio, 0, 1);
    var i_maxCards = this.cards.length;
    var i_numCardsVisible = Math.ceil(i_maxCards * n_adjRatio);
    for (var i_index = 0; i_index < i_maxCards; i_index++) {
      this.cards[i_index].visible = i_index < i_numCardsVisible;
    }
  };

  //===========================================================================================
  //"private"
  //===========================================================================================
  
  //-------------------------------------------------------------------------------------------
  //_init
  //-------------------------------------------------------------------------------------------
  Thunderjack.DeckUi.prototype._init = function() {
    for (var i_index = 0; i_index < this._group.length; i_index++) {
      this.cards.push(this._group.getAt(i_index));
    }
  };
  
})(window);