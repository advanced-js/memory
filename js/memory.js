function Memory() {
  var model = new Memory.Model();
  return new Memory.Controller(model);
}