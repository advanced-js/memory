var Clicks = (function() {
	this.numberOfClicks = 0;
});

Clicks.prototype.incrementClicks = function() {
	if (this.numberOfClicks < 2) {
		this.numberOfClicks ++;
	} else {
		this.numberOfClicks = 1;
	}
}