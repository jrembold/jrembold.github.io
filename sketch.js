var r = 0;
var s = 80;
var up = false;

function setup() {
  // put setup code here
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB, 255);
	background(0);
}

function draw() {
  // put drawing code here
	if (mouseIsPressed) {
		if (up) {
			s += 1;
		} else {
			s -= 1;
		}
		fill(r,255,255);
	} else {
		fill(r,255,255);
	}
	ellipse( mouseX, mouseY, s, s);
	r += 0.5;
	if (r>255) {
		r=0;
	}
	if (s<20) {
		up = true;
	}
	if (s>200) {
		up = false;
	}
}
