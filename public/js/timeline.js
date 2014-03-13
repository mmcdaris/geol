// = Setting up Global Variables
var max_height = 15000;
var extra = 15250;
var max_age = times[0]["ma"];

paper.install(window);  // = Putting it all together into paper
$(document).ready( function() {
  paper.setup('timeline');
  bg("black");
  setup();
  draw_ages();
  view.draw();
  summon_buddy();
  $('#timeline').mousemove(mouse_buddy)
});

function summon_buddy (x, y) {  // The buddy follows the mouse
  var buddy = new paper.Path.Circle([x, y], 10);
  buddy.strokeWidth = 3;
  buddy.strokeColor = "white";

}

function mouse_buddy (event){   // this is the function that binds to the mouse event
  summon_buddy([event.clientX, event.clientY]);
}

function bg(color) {
  $("#timeline").css("background-color", color);
}

function setup () {
  view.viewSize.height = extra;
  window.console.log("whooo!");
}

function horizontals(element, index, array) {
  var age = age_to_y_axis( element["ma"] );
  horizontal(age);
}

function horizontal(y) {
  var horiz = new Path();
  horiz.strokeColor = new Color( y_to_color(y), 0.7, 0.4);
  horiz.strokeWidth = 3;
  var start = new Point(0, y);
  horiz.moveTo(start);
  var end = new Point(view.element.width, y);
  horiz.lineTo(end);

}

function draw_ages() {
  times.forEach(horizontals);
}

function age_to_y_axis(time) {
  return max_height - (time/max_age * max_height);
}

function y_to_color(y) {
  return ((y/max_height) % 255 / 255);
}
