test("double equals is true for a string and the same numer", function() {
  ok( 1 == "1", "Passed!" );
});

test( "triple equals is not the same for string and number", function() {
  ok( 1 !== "1", "Passed!" );
});