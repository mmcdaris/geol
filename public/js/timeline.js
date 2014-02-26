var data = $.getJson("time.json")


var hght = 10000;
view.element.height = hght;
view.height = hght;

var path = new Path();
path.strokeColor = 'red';
var start = new Point(200,200);
path.moveTo(start);
path.lineTo(start + [100, -40]);

var center_circle = new Path.Circle({
       center: view.center,
       radius: 30,
  strokeColor: 'black'
});

function onResize(event) {
  center_circle.position = view.center;
}

window.onscroll = scroll_resize;

function scroll_resize() {
  center_circle. = view.center;
}
