(function() {

	//helper functions. dont want to use jquery

	function hasClass(el, className) {
	  if (el.classList)
	    return el.classList.contains(className)
	  else
	    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
	}

	function addClass(el, className) {
	  if (el.classList)
	    el.classList.add(className)
	  else if (!hasClass(el, className)) el.className += " " + className
	}

	function removeClass(el, className) {
	  if (el.classList)
	    el.classList.remove(className)
	  else if (hasClass(el, className)) {
	    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
	    el.className=el.className.replace(reg, ' ')
	  }
	}

	//board class
	var Board = function(x,y) {
		var self = this;

		if (x <= 0) {
			throw new Error('Rows must be greater than 0');
		}
		if (y <= 0) {
			throw new Error('Columsn must be greater than 0');
		}

		if (x*y > 26) {
			throw new Error('Currently you can not go higher than alphabet letters. 26 Boxes is Max');	
		}
		this.x = x;
		this.y = y;


		this.activeItems = [];
		this.activeElements = [];
		this.allowClick = true;

		//create pieces
		this.items = this.randomizeBoardPieces(x,y);		

		this.draw();
	
	};

	Board.prototype.draw = function() {
		var self = this;
		document.write('<div class="row">');
		this.items.forEach(function(item, index) {
				document.write('<div data-id="' + index + '" class="node"><span>' + self.items[index] + '</span></div>');				
				if ((index+1) % self.y === 0) {
					document.write('</div>'); //close row
					document.write('<div class="row">');
				}
		});

		document.write('</div>');
 
		var memoryNodes = document.getElementsByClassName('node');
		for (var m = 0; m < memoryNodes.length; m++) {
			memoryNodes[m].addEventListener('click', function() {
				var id = Number.parseInt(this.getAttribute('data-id'));
				if (self.allowClick && self.activeItems.indexOf(id) === -1) {
					addClass(this, 'active');
					self.selectNode(id, this);
				}
				
			});
		}		
	};

	Board.prototype.selectNode = function(index, elem) {		
		this.activeItems.push(index);
		this.activeElements.push(elem);
		this.compare();
	};

	Board.prototype.compare = function() {		
		var items = this.items, activeItems = this.activeItems, activeElements = this.activeElements;
		if (activeItems.length === 2 && items[activeItems[0]] === items[activeItems[1]]) {
			this.reset(false);
			activeElements.forEach(function(elem) {
					addClass(elem, 'flash');
			});						
		} else if (activeItems.length == 2) {
			
			this.reset(true);
		}
	}

	Board.prototype.randomizeBoardPieces = function(x,y) {
		var pieces = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
		var totalNodeSets = x*y/2;
		var sets = pieces.splice(0,totalNodeSets);
		var nodes = this.shuffleArray(sets.concat(sets));
		return nodes;
	}

	Board.prototype.shuffleArray = function(array) {
	  var i = 0
	    , j = 0
	    , temp = null

	  for (i = array.length - 1; i > 0; i -= 1) {
	    j = Math.floor(Math.random() * (i + 1))
	    temp = array[i];
	    array[i] = array[j];
	    array[j] = temp;
	  }		
	  return array;
	};

	Board.prototype.reset = function(removeActiveElements) {
		var self = this;
		self.activeItems = [];

		if (removeActiveElements) {
				self.allowClick = false;

				self.activeElements.forEach(function(elem) {
					addClass(elem, 'shake');
					console.log('in shake');
				});

				setTimeout(function() {
					self.activeElements.forEach(function(elem) {
						removeClass(elem, 'active');
						removeClass(elem, 'shake');
					});		
					self.activeElements = [];	
					self.allowClick = true;
				}, 500);
		} else {
			self.activeElements = [];			
		}		
	};

	var x = new Board(4,4);

})();