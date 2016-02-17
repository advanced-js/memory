	function hasClass(el, className) {
	  if (el.classList) {
  		return el.classList.contains(className);
	  }	 else {
	  	return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
	  }	    
	}

	function addClass(el, className) {
	  if (el.classList) {
  		el.classList.add(className);
	  }	    
	  else if (!hasClass(el, className)) {
	  	el.className += " " + className;
	  }
	}

	function removeClass(el, className) {
	  if (el.classList) {
	  	el.classList.remove(className);
	  }	else if (hasClass(el, className)) {
	    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
	    el.className=el.className.replace(reg, ' ');
	  }
	}

	//board class
	var Board = function(x,y, drawingBoard) {
		this.checkErrors(x,y,drawingBoard);
		this.drawingBoard = drawingBoard;		
		this.x = x;
		this.y = y;
		this.activeItems = [];
		this.items = this.randomizeBoardPieces(x,y);
		drawingBoard.draw(this); 
	};

	Board.prototype.checkErrors = function(x,y,drawingBoard) {
		if (x <= 0) {
			throw new Error('Rows must be greater than 0');
		
		}
		if (y <= 0) {
			throw new Error('Columsn must be greater than 0');
		}
		if (x*y % 2 !== 0) {
			throw new Error('You really should have an even number of pieces, or you will never win');	
		}
		if (x*y > 26) {
			throw new Error('Currently you can not go higher than alphabet letters. 26 Boxes is Max');	
		}		
	};

	Board.prototype.selectNode = function(index) {		
		this.activeItems.push(index);
		this.compare();
	};

	Board.prototype.compare = function() {		
		var items = this.items, activeItems = this.activeItems;
		if (activeItems.length === 2 && items[activeItems[0]] === items[activeItems[1]]) {
			this.matchSuccess();
		} else if (activeItems.length === 2) {			
			this.reset(true);
		}
	};

	Board.prototype.matchSuccess = function() {
		this.drawingBoard.matchSuccess();
		this.reset(false);					
	};

	Board.prototype.randomizeBoardPieces = function(x,y) {
		var pieces = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
		var totalNodeSets = x*y/2;
		var sets = pieces.splice(0,totalNodeSets);
		var nodes = this.shuffleArray(sets.concat(sets));
		return nodes;
	};

	Board.prototype.shuffleArray = function(array) {
	  var i = 0, j = 0, temp = null;

	  for (i = array.length - 1; i > 0; i -= 1) {
	    j = Math.floor(Math.random() * (i + 1));
	    temp = array[i];
	    array[i] = array[j];
	    array[j] = temp;
	  }		
	  return array;
	};

	Board.prototype.reset = function(removeActiveElements) {
		var self = this;
		self.activeItems = [];
		self.drawingBoard.reset(removeActiveElements);
	};

		var HTMLBoard = function(boardId) {
		this.id = boardId;
		this.allowClick = true;
		this.activeElements = [];
		};

		HTMLBoard.prototype.reset = function(removeActiveElements) {
		var self = this;
		if (removeActiveElements) {
				self.allowClick = false;
				self.activeElements.forEach(function(elem) {

					addClass(elem, 'shake');
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

		HTMLBoard.prototype.draw = function(board) {
			var self = this;
			var html = '';
			html += '<div class="row">';
			board.items.forEach(function(item, index) {
					html += '<div data-id="' + index + '" class="node"><span>' + board.items[index] + '</span></div>';
					if ((index+1) % board.y === 0) {
						html += '</div>';//close row
						html += '<div class="row">';
					}
			});

			html += '</div>';
				document.getElementById(self.id).innerHTML = html;


			var clickEvent = function() {
					var id = Number.parseInt(this.getAttribute('data-id'));
					if (self.allowClick && board.activeItems.indexOf(id) === -1) {
						addClass(this, 'active');
						self.activeElements.push(this);
						board.selectNode(id);					
					}				
			};

			var memoryNodes = document.getElementsByClassName('node');
			for (var m = 0; m < memoryNodes.length; m++) {
				memoryNodes[m].addEventListener('click', clickEvent);
			}
		};

		HTMLBoard.prototype.matchSuccess = function() {
			this.activeElements.forEach(function(elem) {
					addClass(elem, 'flash');
			});		
		};

		var CanvasBoard = function(boardId) {
			this.id = boardId;
			this.allowClick = true;
			this.activeElements = [];
		};

		CanvasBoard.prototype.reset = function(removeActiveElements) {
		var self = this;
		if (removeActiveElements) {
				self.allowClick = false;
				setTimeout(function() {
					self.activeElements.forEach(function(elem) {
						//reset active leemnts here
					});		
					self.activeElements = [];	
					self.allowClick = true;
				}, 500);			
		} else {
			self.activeElements = [];			
		}
		};

		CanvasBoard.prototype.draw = function(board) {
		var self = this;
		var context = document.getElementById('canvasBoard').getContext("2d");

		var x =50, y=50, width= 50, height= 50;

		board.items.forEach(function(item, index) {
				context.rect(x,y,width,height);
				context.stroke();
				//set click listeiner here
				x+= 60;
				if ((index+1) % board.y === 0) {
					x =50;
					y+= 60;
				}
		});

		};

		CanvasBoard.prototype.matchSuccess = function() {
			this.activeElements.forEach(function(elem) {
					//addClass(elem, 'flash');
					//set active style here
			});		
		};


	document.getElementById('generate').addEventListener('click', function() {
		var drawingBoard = new HTMLBoard('board');
		//var canvasBoard = new CanvasBoard('canvasBoard'); ability to swap diff displays for any memory grid

		var rows = document.getElementById('rows').value;
		var columns = document.getElementById('columns').value;
		try {	
			var board = new Board(rows,columns, drawingBoard); 
		} catch(err) {
			alert(err);	
		}
		
	});
