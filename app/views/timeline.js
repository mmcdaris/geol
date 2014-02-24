var paper = Raphael("timeline", "100%", "1000%");
var attributes = {fill: "#cecece", stroke: "#000", "stroke-width": 3};
// var circle = paper.circle(250, 150, 100).attr(attributes);

var width  =$("#timeline").innerWidth();
var height =$("#timeline").innerHeight();
var radius = 20;

for (var i=radius/2;i<width;i=i+radius) {
  for (var j=radius/2;j<height;j=j+radius) {
    paper.circle(i, j, radius/3).attr(attributes);
  };
};

console.log($("#timeline").innerWidth());
console.log($("#timeline").innerHeight());
