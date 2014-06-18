var Cell = function(grid, id){
	this.grid = grid;
	this.id = id+=100;			//not strictly required on init;
	//this.status = "HIDDEN";	//nah, just using DOM for now :/
	//this.selected = false;	//models, views... some other day.
	this.val;
	this.init();
	
}
Cell.prototype.init = function() {
	var chararray = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","X","1","2","3","4","5","6","7","8","9","0"];	//["AA","BB","CC","DD","EE"];	//
	this.getRandomVal(chararray);
	while (this.isValAlreadyUsed()) {
		this.getRandomVal(chararray);
	};  
	//console.log("DONE: this val =========================== ", this.val);
};
Cell.prototype.getRandomVal = function(chararray) {
	var index = Math.floor(Math.random()*chararray.length);
	this.val = chararray[index];
	//console.log("rand val = ",this.val, ",index=", index);
}
Cell.prototype.isValAlreadyUsed = function() {
	for (var i=0; i<this.grid.cellsarray.length; i++) {
		//console.log(" - compare : ", this.val , this.grid.cellsarray[i].val, (this.val === this.grid.cellsarray[i].val))
		if (this.val === this.grid.cellsarray[i].val) { return true; }
	}
	return false;
}
