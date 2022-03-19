window.onresize = function() {
  var winw = window.innerWidth;
  var winh = window.innerHeight;
  var xvalue = winw / width;
  var yvalue = winh / height;
  scale = xvalue;
  if (yvalue < xvalue) {
    scale = yvalue
  }
  canvas.style.transform = "scale(" + scale + ")";
  canvas.style.left = (winw - width) / 2 + "px";
  canvas.style.top = (winh - height) / 2 + "px";
};
window.onload = function() {
  var winw = window.innerWidth;
  var winh = window.innerHeight;
  var xvalue = winw / width;
  var yvalue = winh / height;
  scale = xvalue;
  if (yvalue < xvalue) {
    scale = yvalue
  }
  canvas.style.transform = "scale(" + scale + ")";
  canvas.style.left = (winw - width) / 2 + "px";
  canvas.style.top = (winh - height) / 2 + "px";
}
document.addEventListener("keydown", keydown, false);

function keydown(e) {
  if (e.keyCode == 70) {
    cube.turn(1,2,1)
    started=true;
  }
  if (e.keyCode == 74) {
    cube.turn(1,2,3)
    started=true;
  }
  if (e.keyCode == 69) {
    cube.turn(0,0,3)
    started=true;
  }
  if (e.keyCode == 68) {
    cube.turn(0,0,1)
    started=true;
  }
  if (e.keyCode == 73) {
    cube.turn(0,2,3)
    started=true;
  }
  if (e.keyCode == 75) {
    cube.turn(0,2,1)
    started=true;
  }
  if (e.keyCode == 71) {
    cube.turn(2,0,3)
    started=true;
  }
  if (e.keyCode == 72) {
    cube.turn(2,0,1)
    started=true;
  }
  if (e.keyCode == 90) {
    cube.turn(2,2,3)
    started=true;
  }
  if (e.keyCode == 79) {
    cube.turn(2,2,1)
    started=true;
  }
  if (e.keyCode == 83) {
    cube.turn(1,0,1)
    started=true;
  }
  if (e.keyCode == 76) {
    cube.turn(1,0,3)
    started=true;
  }
  if (e.keyCode == 77) {
    cube.rotate(1,3)
  }
  if (e.keyCode == 81) {
    cube.rotate(1,1)
  }
  if (e.keyCode == 84) {
    cube.rotate(0,3)
  }
  if (e.keyCode == 78) {
    cube.rotate(0,1)
  }
  if (e.keyCode == 82) {
    cube.turn(0,0,3)
    cube.turn(0,1,3)
    started=true;
  }
  if (e.keyCode == 86) {
    cube.turn(0,0,1)
    cube.turn(0,1,1)
    started=true;
  }
  if (e.keyCode == 85) {
    cube.turn(0,1,3)
    cube.turn(0,2,3)
    started=true;
  }
  if (e.keyCode == 188) {
    cube.turn(0,1,1)
    cube.turn(0,2,1)
    started=true;
  }
  if (e.keyCode == 13) {
    for (var i = 0; i < Math.random()*50+20; i++) {
      cube.turn(Math.floor(Math.random()*3),Math.floor(Math.random()*3),Math.floor(Math.random()*3)+1)
    }
    timer = 0;
    started = false;
  }
}
// cube.turn(axis<0,1,2>,row<0,1,2>,turns<1,2,3>)
