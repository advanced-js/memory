test("it finds elements with the class square", function(){
	var factory = new squareFactory();
	equal(factory.squareElements.length, 6)
});

test("it initializes square objects with those elements", function(){
	var factory = new squareFactory();
	factory.initSquareObjects()
	equal(factory.squareObjects[0].constructor, squareObject)
});

test("the square object passes through the square as its element", function(){
	var factory = new squareFactory();
	factory.initSquareObjects()
	var element = $(factory.squareObjects[0].el)
	equal(element.attr('class'), "square")
});

test("init sets up the onClick handlers", function(){
	var factory = new squareFactory();
	factory.initSquareObjects()
	var element = $(factory.squareObjects[0].el)
	element.click()
	equal(element.attr('class'), "blue")
});

