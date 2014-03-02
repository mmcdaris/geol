var max_height = 15000;
var max_age = times[0]["ma"];

paper.install(window);
window.onload = function() {
  paper.setup('timeline');
    setup();
    draw_ages();
  view.draw();
}

function setup () {
  view.element.height = max_height;
  view.height = max_height;
}

function horizontal(y) {
  var path = new Path();
  path.strokeColor = 'green';
  path.strokeWidth = 5;
  var start = new Point(0, y);
  path.moveTo(start);
  var end = new Point(view.element.width, y);
  path.lineTo(end);
  var circle = new Circle();
}

function line () {
  var path = new Path();
  path.strokeColor = 'black';
  var start = new Point(100, 100);
  path.moveTo(start);
  path.lineTo(start.add([ 200, -50 ]));
}

function age_to_y_axis(time) {
  // total height is max_height
  // an element has ["ma"] key to get the years ago in millions.
  // time/max_age = y-position/max_height
  return max_height - (time/max_age * max_height);
}

function horizontals(element, index, array) {
  var age = age_to_y_axis( element["ma"] );
  horizontal(age);
}

function draw_ages() {
  times.forEach(horizontals);
}

function
