// = Putting it all together into paper
//
paper.install(window);
bg("black");
setup();
draw_ages();
view.draw();
summon_buddy(200, 200);

function summon_buddy (x, y) {
  buddy = new Path.Circle([x, y], 70);
  buddy.strokeWidth = 3;
  buddy.smooth();
  buddy.strokeColor = "red";
  text = new PointText([x, y]);
  text.justification = 'center';
  text.fillColor = 'white';
  text.content = ma(y);
}

function build_around_point(x, y, r) {
  var shape = new Integer;
}

function onMouseMove(event) {
  //console.log(event.point);
  buddy.position = event.point;
  text.position = event.point;
  text.content = ma(event.point.y);
}

function onFrame(event) {
  buddy.strokeColor.hue +=1;
}

function bg(color) {
  $("#timeline").css("background-color", color);
}

function setup () {
  view.viewSize.height = extra;
}

function horizontals(element, index, array) {
  var age = age_to_y_axis( element["ma"] );
  horizontal(age);
}

function horizontal(y) {
  y += 100;
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

function y_ontimes() {
  times.forEach();
}

function age_to_y_axis(time) {
  return max_height - (time/max_age * max_height);
}

function y_to_age(y) {
  y -= 100
  return max_age - ( ( (y)/max_height ) * max_age );
}

function y_to_color(y) {
  return ((y/max_height) % 255 / 255);
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


// Timeline Object

function Timeline() {
    // has many timepoints
    this.times = times;
    this.times = name;
    this.stats = function () {
      console.log( this.name + " writes " + this.lang);
    }
}

function Timepoint(age, eon, era, period, epoch) {
  this.age    = age;
  this.y      = age_to_y(age);
  this.eon    = eon;
  this.era    = era;
  this.period = period;
  this.epoch  = epoch;
}

function filter_for(k, v) {
    times[v] = times.filter(function(x) { return x[k] == v});
}
