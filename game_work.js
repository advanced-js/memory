jQuery(function($) {
  "use strict";
  var click = true,
    prevSelectedValue = '';
  $('.v2_canter2').hide();
  var MemoryGame = function() {};
  MemoryGame.prototype = {
    selectedItem: false,
    assets: ['imac', 'wine', 'diamond', 'oypad', 'man', 'target', 'keyboards', 'speakers', 'imac', 'wine', 'diamond', 'oypad', 'man', 'target',
      'keyboards', 'speakers'
    ],
    shuffleItems: function() {
      //https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
      //picking random number between a range use Math.floor(Math.randon() * (1+hight-low)) + low
      for (var i = this.assets.length - 1; i > 1; i--) {
        var j = Math.floor(Math.random() * i);
        var temp = this.assets[i];
        this.assets[i] = this.assets[j];
        this.assets[j] = temp;
      }
    },
    createElements: function(id, appendTarget, type, className) {
      var element = document.createElement((type) ? type : 'div');
      if (className) {
        element.className = className;
      } else if (id) {
        element.id = id;
      }
      if (appendTarget) {
        try {
          appendTarget.appendChild(element);
        } catch (e) {
          'e', e;
        }
      }
      return element;
    },
    start: function() {},
    display: function() {
      $('.v2_center').hide();
      $('.v2_canter2').css('display', 'block');
      var parentNode = $('.v2_center2');
      for (var i = 0; i < this.assets.length; i++) {
        this.createnew1 = this.createElements(null, parentNode, 'li', 'null1');
        this.createnew = this.createElements('hid' + i, this.createnew1, 'a', 'null');
        var newNode = this.createElements(null, this.createnew, 'img', 'hid' + i);
        var newNode2 = this.createElements(null, this.createnew, 'img', 'test2');
        newNode.src = 'assets/' + this.assets[i] + '.png';
        newNode.alt = this.assets[i];
        newNode2.src = 'assets/open-box.png';
        $(parentNode).css('margin-top', '32px');
        $(parentNode).append(this.createnew1);
        $('.hid' + i).on('click', function(evt) {
          var imgValue = evt.currentTarget.attributes.alt.nodeValue;
          if (prevSelectedValue !== '') {
            if (evt.currentTarget.parentNode.className !== 'on') {
              if (prevSelectedValue == imgValue) {
                evt.currentTarget.parentNode.className = 'on';
                var found = document.querySelectorAll('a.on');
                var found2 = '';
                if (found.length > 0) {
                  for (var i = 0, len = found.length; i < len; i++) {
                    found2 = found[i];
                    found2.className = 'found';
                  }
                }
              } else {
                console.log('card not match')
              }
            } else {
              console.log('same selection');
            }
            prevSelectedValue = '';
            var test = document.querySelectorAll('a.on');
            var test2;
            if (test.length > 0) {
              for (var i = 0, len = test.length; i < len; i++) {
                test2 = test[i];
                test2.className = '';
              }
            }
          } else {
            prevSelectedValue = imgValue;
            evt.currentTarget.parentNode.className = 'on';
          }
        });
      }
    },
    removeChildren : function(){
    	var removeElement = $('ul li'); 
    	removeElement.remove();
    }
  };
  $('.resetGame').on('click', function() {
    var instanceMemoryGame = new MemoryGame();
    instanceMemoryGame.removeChildren();
    instanceMemoryGame.shuffleItems();
    instanceMemoryGame.display();
  });
});