// = Putting it all together into paper
//
paper.install(window);
bg("black");
setup();
draw_ages();
view.draw();
summon_buddy(200, 200);

function onResize(event) {
  setup();
}

function summon_buddy (x, y) {
  buddy = new Path.Circle([x, y], 70);
  buddy.strokeWidth = 3;
  buddy.strokeColor = "red";
  text = new PointText([x, y]);
  text.justification = 'center';
  text.fillColor = 'white';
  text.content = ma(y);
}

function onMouseMove(event) {
  //console.log(event.point);
  buddy.position = event.point;
  text.position = event.point;
  text.content = ma(event.point.y);
}

function onMouseUp(event) {
  console.log(event.point);
}

function onFrame(event) {
  buddy.strokeColor.hue +=1;
}

function bg(color) {
  $("#timeline").css("background-color", color);
}

function setup () {
  view.viewSize.height = extra;
  view.viewSize.width = window.innerWidth;
}

function horizontals(element, index, array) {
  var age = age_to_y( element["ma"] );
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
  unit_to_boxes("supereon", 0);
  unit_to_boxes("eon", 1);
  unit_to_boxes("era", 2);
  unit_to_boxes("period", 3);
  unit_to_boxes("epoch", 4);
  unit_to_boxes("age", 5);
  times.forEach(horizontals);
}

function find_edges(unit) {
  var edges = {};
  times.map (function (time) { if (time[unit] in edges) edges[time[unit]] = time.ma; else edges[time[unit]] = time.ma});
  return edges;
}

function unit_to_boxes(unit, target) {
  var width  = window.innerWidth/6;
  var left   = target*width;
  var top    = age_to_y(max_age);
  var bottom;
  var height;
  var edges  = find_edges(unit);

  for(element in edges) {
    bottom = age_to_y(edges[element]);
	height = bottom - top;
	console.log(element);
    var square = new Path.Rectangle([left,top,width,height])
	if (element != null) {
	  square.style = {
	  fillColor: new Color(1, 0, 0),
	  strokeColor: 'black',
	  strokeWidth: 5 };
      top = bottom;
	} else {
	  square.fillColor = "blue";
	}
  }
}


function age_to_y(time) {
  var y = max_height - (time/max_age * max_height);
  return y+100;
}

function y_to_age(y) {
  y -= 100;
  return max_age - ( ( (y)/max_height ) * max_age );
}

function y_to_color(y) {
  return ((y/max_height) % 255 / 255);
}

function x_to_color(x) {
  return ((x/window.innerWidth) % 255 / 255);
}

function ma(y) {
  var age = Math.floor(y_to_age(y))
  if(age >= max_age) {
    text.color = "red";
    return "Earth not born Yet";
  }
  else if(age < 0) {
    return (age*-1) + "Million Years After Now"
  }
  else{
    return age + " Million Years Ago";
  }
}
