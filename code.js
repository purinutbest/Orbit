PVector r;
var width = 500;
var height = 400;
var x = 0;
var y = 0;
var dx;
var dy;
var v;
var vx;
var vy;
var theta;
var alpha;
var pi = 3.1415926535;
var g = 9.8;
var dt = 0.1;
var t = 0.0;
var bStart = 0;

void setup() {
  size(width,height);
  r= new PVector(0,0);
  velText = document.getElementById("vel");
  angleText = document.getElementById("angle");
  drag1Text = document.getElementById("drag1");
  startButton = document.getElementById("start");
  stopButton = document.getElementById("stop");
  resetButton = document.getElementById("reset");
  startButton.addEventListener("click",shoot);
  stopButton.addEventListener("click",stop);
  resetButton.addEventListener("click",reset);
}

void shoot() {
  v = parseFloat(velText.value) || 1;
  theta = parseFloat(angleText.value) || 45;
  alpha = parseFloat(drag1Text.value) || 0.01;
  vx = v*cos(theta*pi/180.0);
  vy = v*sin(theta*pi/180.0);
  bStart = 1;
}

void stop() {
  bStart = 0;
}

void reset() {
  x = 0;
  y = 0;
  dx = 0;
  dy = 0;
  t = 0.0;
  bStart = 0;
}

void draw() {
//  background(200, 200, 200);
  if (bStart == 1 && y >= 0.0) {
    x = x + vx*dt;
    y = y + vy*dt;
    vx = vx - alpha*vx*dt;
    vy = vy - (g + alpha*vy)*dt;
  }
  else {
    bStart = 0;
  }
  fill(77, 66, 66);
  ellipse(r.x, r.y, 2, 2);
};
