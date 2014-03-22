// = Putting it all together into paper
//
paper.install(window);
bg("black");
setup();
draw_ages();
view.draw();
summon_buddy(200);

function summon_buddy (y) {
  buddy = horizontal(y);
  buddy.strokeWidth = 1;
  buddy.strokeColor = "black";
  text = new PointText([200, y]);
  text.justification = 'center';
  text.fillColor = 'black';
  text.fontSize = 24;
  text.content = ma(y);
}

function onMouseMove(event) {
  //console.log(event.point);
  buddy.position.y = event.point.y;
  text.position = event.point;
  text.content = ma(event.point.y + 100);
}

function onResize(event) {
  setup();
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
  var start = new Point(0, y);
  horiz.moveTo(start);
  var end = new Point(view.element.width, y);
  horiz.lineTo(end);
  return horiz;
}

function draw_ages() {
  unit_to_boxes("supereon", 0, "#E5F5CC");
  unit_to_boxes("eon",      1, "#5B585A");
  unit_to_boxes("era",      2, "#5E677A");
  unit_to_boxes("period",   3, "#93AEA6");
  unit_to_boxes("epoch",    4, "#DDE4B5");
  unit_to_boxes("age",      5, "#ECF0D6");
  //times.forEach(horizontals);
}

function find_edges(unit) {
  var edges = {};
  times.map (function (time) { if (time[unit] in edges) edges[time[unit]] = time.ma; else edges[time[unit]] = time.ma});
  return edges;
}

function unit_to_boxes(unit, target, color) {
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
    square.element = element;
    square.age = edges[element];
    if (square.element != "null") {
      square.style = {
        fillColor: color,
        strokeColor: 'black',
        strokeWidth: 2,
        strokeJoin: 'bevel'
      };
        top = bottom;
    } else {
      square.fillColor = "black";
    }
    box_label(square);
  }
}

function box_label(square) {
  var text = new PointText(square.position);
  text.justification = 'center';
  text.fillColor = 'black';
  text.fontSize = 24;
  text.content = square.element + "\n" + square.age + " Mya";
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
    return age + " Mya";
  }
}
