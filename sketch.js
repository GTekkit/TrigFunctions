/*
Written by Grady Marshall
Last updated 12/18/19
Built for the purpose of helping people better understand how Trigonometry works
Free to use for anyone who can benefit from it
*/



var angle, winWidth, winHeight, circleCenterY, circleCenterX, circleRadius,
skeletonColor, maxAngle, minAngle;

function setup() {
  
  winWidth = displayWidth;
  winHeight = displayHeight;
  circleCenterY = winHeight / 2
  circleCenterX = 3 * winWidth / 8
  circleRadius = winHeight / 4
  skeletonColor = 180
  maxAngle = 0
  minAngle = 0
  angle = createSlider(-6.28, 12.56, 0, 0.00001);
  
  angle.position(10, 10);
  createCanvas(winWidth, winHeight);
  stroke(0);
  fill(250);
}

function draw() {
  background(230);
  setExtreme();
  drawCircle(circleCenterX, circleCenterY, circleRadius);
  drawSinGraph(9 * winWidth / 16, 5 * winHeight / 16, 3 * winWidth / 8, winHeight / 4);
  drawCosGraph(9 * winWidth / 16, 10 * winHeight / 16, 3 * winWidth / 8, winHeight / 4);
  drawTanGraph(9 * winWidth / 16, 15 * winHeight / 16, 3 * winWidth / 8, winHeight / 4);
}

function setExtreme(){
  if(angle.value() > maxAngle){
    maxAngle = angle.value();
  }
  if(angle.value() < minAngle){
    minAngle = angle.value();
  }
}

function drawCircle(x, y, r) {
  strokeWeight(5);
  push();
  stroke(skeletonColor);
  ellipse(x, y, r * 2);
  line(x - r, y, x + r, y); //x
  line(x, y - r, x, y + r); //y
  line(x+r, 0, x+r, winHeight); //Tan Intercept
  rect(x-r*0.1, y-r*1.2, r*0.2, r*0.15); //top
  rect(x-r*0.1, y+r*1.05, r*0.2, r*0.15); //bottom
  rect(x-r*1.25, y-r*0.075, r*0.2, r*0.15); //left
    push();
      fill(0);
      strokeWeight(0);
      textSize(15);
      text("0 , 1", x-r*0.07, y-r*1.1); //top
      text("0 ,-1", x-r*0.07, y+r*1.15); //bottom
      text("-1, 0", x-r*1.22, y+r*0.03); //left
    pop();
  pop();
  drawCos(x,y,r);
  drawSin(x,y,r);
  drawTan(x,y,r);
  segment(x,y,-angle.value(),r);
  ellipse(x+r*cos(angle.value()),y-r*sin(angle.value()), r/16)
}

function segment(x, y, a, l) {
  push();
  translate(x, y);
  rotate(a);
  line(0, 0, l, 0);
  pop();
}

function drawCos(x,y,r) {
  push();
    stroke(0,0,255);
    line(x, y, x+r*cos(-angle.value()), y);
  pop();
}

function drawSin(x,y,r) {
  push();
    stroke(0,200,0);
    line(x + r * cos(-angle.value()), y, x+r*cos(-angle.value()), y+r*sin(-angle.value()));
  pop();
}

function drawTan(x,y,r) {
  push();
    stroke(skeletonColor);
    if(cos(angle.value())>0){
      segment(x,y,-angle.value(),sqrt(tan(angle.value())*tan(angle.value())*r*r+r*r));
    } else {
      segment(x,y,-angle.value()-3.14,sqrt(tan(angle.value())*tan(angle.value())*r*r+r*r));
    }
    stroke(255,0,0);
    line(x+r,y,x+r,y-r*tan(angle.value()));
    stroke(0);
    ellipse(x+r,y-r*tan(angle.value()),r/16);
  pop();
}

function drawSinGraph(x, y, width, height) {
  drawGraph(x, y, width, height);
  push();
  stroke(0);
  strokeWeight(2);
  fill(255);
  ellipse(x+width/3+(width/3)*(angle.value()/6.28), y-height/2-(width/12)*sin(angle.value()), height/16);
  if(maxAngle > 0 || minAngle < 0){
    for(i=0; i < maxAngle-minAngle; i=i+10/width){
      var tempX = minAngle+i;
      var tempY = sin(tempX);
      var nextX = minAngle+(i+10/width);
      var nextY = sin(minAngle+(i+10/width));
      push();
      stroke(0,200,0);
      line(x+width/3+(width/3)*tempX/6.28, y-height/2-(width/12)*tempY, x+width/3+(width/3)*nextX/6.28, y-height/2-(width/12)*nextY);
      pop();
    }
  }
  pop();
}

function drawCosGraph(x, y, width, height) {
  drawGraph(x, y, width, height);
  push();
  stroke(0);
  strokeWeight(2);
  fill(255);
  ellipse(x+width/3+(width/3)*(angle.value()/6.28), y-height/2-(width/12)*cos(angle.value()), height/16);
  if(maxAngle > 0 || minAngle < 0){
    for(i=0; i < maxAngle-minAngle; i=i+10/width){
      var tempX = minAngle+i;
      var tempY = cos(tempX);
      var nextX = minAngle+(i+10/width);
      var nextY = cos(minAngle+(i+10/width));
      push();
      stroke(0,0,255);
      line(x+width/3+(width/3)*tempX/6.28, y-height/2-(width/12)*tempY, x+width/3+(width/3)*nextX/6.28, y-height/2-(width/12)*nextY);
      pop();
    }
  }
  pop();
}

function drawTanGraph(x, y, width, height) {
  drawGraph(x, y, width, height);
  push();
  stroke(0);
  strokeWeight(2);
  fill(255);
  if(tan(angle.value()) <= 4*height/width && tan(angle.value()) >= -4*height/width){
  ellipse(x+width/3+(width/3)*(angle.value()/6.28), y-height/2-(width/8)*tan(angle.value()), height/16);
  }
  if(maxAngle > 0 || minAngle < 0){
    for(i=0; i < maxAngle-minAngle; i=i+10/width){
      var tempX = minAngle+i;
      var tempY = tan(tempX);
      var nextX = minAngle+(i+10/width);
      var nextY = tan(minAngle+(i+10/width));
      push();
      if(tempY <= 4*height/width && tempY >= -4*height/width && nextY <= 4*height/width && nextY >= -4*height/width)
      {
      stroke(255,0,0);
      line(x+width/3+(width/3)*tempX/6.28, y-height/2-(width/8)*tempY, x+width/3+(width/3)*nextX/6.28, y-height/2-(width/8)*nextY);
      }
      pop();
    }
  }
  pop();
}

function drawGraph(x, y, width, height) {
  push();
  stroke(skeletonColor);
  rect(x, y, width, -height);
  line(x, y - height / 2, x + width, y - height / 2);
  line(x + width / 3, y, x + width / 3, y - height);
  for (i = 0; i < 7; i++) {
    line(x + width / 3 + (i + 1) * width / 12, y - height / 2 + height / 12, x + width / 3 + (i + 1) * width / 12, y - height / 2 - height / 12);
  }
  for (i = 0; i < 3; i++) {
    line(x + width / 3 - (i + 1) * width / 12, y - height / 2 + height / 12, x + width / 3 - (i + 1) * width / 12, y - height / 2 - height / 12);
  }
  line(x + width / 3 - height / 12, y - height / 2 - width / 12, x + width / 3 + height / 12, y - height / 2 - width / 12);
  line(x + width / 3 - height / 12, y - height / 2 + width / 12, x + width / 3 + height / 12, y - height / 2 + width / 12);
  pop();
}