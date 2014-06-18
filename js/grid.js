var Grid = function(gridsize){		//console.log("grid here..." + gridsize);
	this.gridsize = gridsize;
	this.cellsarray = [];
	this.selectedCells = [];
	this.score=0;
	this.init();
}
Grid.prototype.init = function() {	//console.log("grid init()..." + this.gridsize);
	this.$dd = $('#gridsize_select').val(0).css('opacity', 0.5).blur();
	this.$msg = $('#msg').text('Select matching pairs of cells, below.');
	this.createCells();
	this.shuffleCells();
	this.drawGrid();
};
Grid.prototype.createCells = function() {	//console.log("createCells()");
	var cell;
	var len = this.gridsize * this.gridsize /2;
	for (var i=0; i<len; i++) {	// make half of the cells
		cell = new Cell( this );
		this.cellsarray.push(cell);
	}
	for (var i=len; i<len*2; i++) {
		cell = new Cell( this );	// make other half of the cells (copy values from first half)
		cell.val = this.cellsarray[i-len].val;
		this.cellsarray.push(cell);
	}
	//console.log("cellsarray=", this.cellsarray);	
};
Grid.prototype.shuffleCells = function () {
	var currentIndex = this.cellsarray.length;
	var temporaryValue;
	var randomIndex;
	//freshly stolen from zena. thanks zena!  :)
	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = this.cellsarray[currentIndex];
		this.cellsarray[currentIndex] = this.cellsarray[randomIndex];
		this.cellsarray[randomIndex] = temporaryValue;
	};
};
Grid.prototype.drawGrid = function() {
	var htmstr = "";
	var rowstr = "";
	var cell;
	for (var i=0; i<this.cellsarray.length; i++) {
		cell = this.cellsarray[i];
		cell.id = i;
		rowstr += '<td id="td_'+cell.id+'" class="unmatched"><span id="cell_'+cell.id+'" class="hidden">' + cell.val + '</span></td>\n'
		if ((i+1) % this.gridsize===0) {
			rowstr = '<tr>\n' + rowstr + '</tr>\n';
			htmstr += rowstr;	rowstr = "";
		}
	}
	htmstr = '<table id="grid_table">\n<tbody>\n' + htmstr + '</tbody>\n</table>\n';
	htmstr += '<div id="score_holder">Score: <span id="score">0</span></div>\n';
	$('#grid_holder').empty().html(htmstr);
	$('#grid_table').on('click', 'td.unmatched', this.doTDClick);	//console.log(htmstr);
};
Grid.prototype.doTDClick = function(e) {
	// this)is the <TD>	
	var $td   = $(this).addClass('selected');
	var $span = $(this).find('span').removeClass('hidden');		//console.log($td, $span.prop('id'));
	grid.setCellSelected( $span.prop('id') );					//context!! probably could be done better
};
Grid.prototype.setCellSelected = function(id) {
	var index = id.split("_")[1];	//cell_1 --> 1
	this.selectedCells.push(this.cellsarray[index]);
	//console.log("selectedCells=", this.selectedCells, this.cellsarray.length, "index=",index);

	if (this.selectedCells.length===2) {
		var that  = this;
		if (this.selectedCells[0].val===this.selectedCells[1].val) {
			this.$msg.html('Nice job!');
			if (this.selectedCells[0].id===this.selectedCells[1].id) {	//console.log("cant select same cell twice!", this.selectedCells);
				this.selectedCells.pop();  return;
			}
			var id0 = this.selectedCells[0].id;
			var id1 = this.selectedCells[1].id;
			//console.log("parent", $('#cell_'+id0).parent())
			//console.log("parent", $('#cell_'+id1).parent())
			$('#cell_'+id0).parent().removeClass('unmatched');
			$('#cell_'+id1).parent().removeClass('unmatched');
			if (this.isGameOver()) {	//alert("WIN!");
				this.$dd.css('opacity', 1).focus();
				this.$msg.html('<b>Great Game!</b><br>Select grid size to begin new game.');
			} else {
				setTimeout( function(){that.doPairSuccess()}, 1000);
			}
		} else {
			this.$msg.html('Too bad, Try again.');
			this.setScore();
			setTimeout( function(){that.doPairFail()}, 1000);
		}
		$('#grid_table').off('click', 'td.unmatched', this.doTDClick);//no clicking allowed until 1000mx	//OFF		
	} else {
		this.$msg.text('Try to select the other "' + this.selectedCells[0].val + '"...');
	}
}
Grid.prototype.doPairSuccess = function() {
	$('#grid_table').on('click', 'td.unmatched', this.doTDClick);	//clicking allowed again	//ON	
	this.selectedCells = [];
	this.$msg.text('Select another matching pair...')
}
Grid.prototype.doPairFail = function() {
	var cell;
	for (var i = 0; i < this.selectedCells.length; i++) {
		cell = this.selectedCells[i];
		$('#cell_'+cell.id).addClass('hidden');
		$('#cell_'+cell.id).parent().addClass('unmatched');
		$('#cell_'+cell.id).parent().removeClass('selected');
	}
	$('#grid_table').on('click', 'td.unmatched', this.doTDClick);	//clicking allowed again	//ON
	this.selectedCells = [];
	this.$msg.html('Select a matching pair of cells, below.');
}
Grid.prototype.setScore = function() {
	this.score++;
	$('#score').html(this.score);
}
Grid.prototype.isGameOver = function() {//console.log("isGameOver...");
	return ( $('#grid_table td.unmatched').length===0 );
}

