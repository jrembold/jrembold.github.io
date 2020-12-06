
class Particle {

	constructor(col) {
		this.x = size/2;
		this.y = random(-1,1);
		this.r = 4;
		this.color = color(col,250,255,150);
		this.othercolor = color(col+20,150,255,150);
	}

	update() {
		this.x -= 1;
		this.y += 4*random(-1,1);
		if (this.y < atan(PI/arms)*this.x) {
			this.y += 1;
		}
		if (this.y > -atan(PI/arms)*this.x) {
			this.y -= 1;
		}

	}

	show() {
		noStroke();
		fill(this.color);
		ellipse(this.x, this.y, this.r*2, this.r*2);
	}

	showmirror() {
		noStroke();
		fill(this.othercolor);
		ellipse(this.x, -this.y, this.r*2, this.r*2);
	}

	checkstop(deadParts) {
		if (this.x < 0) {
			return true;
		} else if (deadParts.length > 0) {
			for (let d of deadParts) {
				if (pow(this.x - d.x,2)+pow(this.y - d.y, 2) < pow(this.r*2,2)) {
					return true;
				}
			}
		}
		return false;
	}
}

let P = null;
let dP = [];
let arms = 6;
let size = 0;
let freeze = false;
let colstart = 120;
let autoplay = false;
let delay = 250;
let frame_finished = 0;

function setup() {
	main = createCanvas(windowWidth, windowHeight);
	size = min(windowWidth, windowHeight);
	colorMode(HSB,255);
	resetFlake();
	P = new Particle(colstart);
}


function draw() {
	translate(width/2, height/2);
	rotate(-PI/2);

	if (frameCount == 1) {
		resetFlake();
	}

	if (autoplay & frameCount-frame_finished > delay & freeze) {
		resetFlake();
		//freeze = false;
		//background(0);
		//dispAutoText();
		//colstart = random(120,140);
	}

	if (!freeze) {

		while (P.checkstop(dP) == false) {
			P.update();
		}
		if (P.checkstop(dP) == true) {
			dP.push(P);
			colstart += .1
			P = new Particle(colstart);
			if (P.checkstop(dP) == true) {
				dP = [];
				//background(0);
				//arms = random([5,6,7,8,9]);
				freeze = true;
				frame_finished = frameCount;
			}
		}

		for (let i=0; i < arms; i++) {
			rotate(2*PI/arms);
			if (dP.length > 0) {
				dP[dP.length-1].show();
				dP[dP.length-1].showmirror();
				//for (let d of dP) {
					//d.show();
					//d.showmirror();
				//}
			}
		}
	}
}

function dispAutoText() {
	push();
	rotate(PI/2);
	fill(200);
	textSize(20);
	textAlign(RIGHT);
	text('Autoplay On', width/2-5,height/2-5);
	pop();
}

function removeAutoText() {
	push();
	fill(0);
	rotate(PI/2)
	rect(width/2-150, height/2-25, 150, 25);
	pop();
}

function resetFlake() {
	freeze = false;
	background(0);
	colstart = random(120,140);
	dP = [];
	push();
	rotate(PI/2);
	fill(200);
	textSize(10);
	textAlign(LEFT);
	text('Press any key for new snowflake', 5-width/2, height/2-15);
	text('Press A for autoplay', 5-width/2, height/2-5);
	pop();
	if (autoplay) {
		dispAutoText();
	}
}

function keyTyped() {
	//background(0);
	//freeze = false;
	//colstart = random(120,140);
	if (key === 'a') {
		if (!autoplay) {
			autoplay = true;
			dispAutoText();
		} else {
			autoplay = false;
			removeAutoText()
		}
	} else {
		resetFlake();
	}
}

function touchStarted() {
	if (touches.length > 1) {
		if (!autoplay) {
			autoplay = true;
			dispAutoText();
		} else {
			autoplay = false;
			removeAutoText();
		}
	} else {
		resetFlake();
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
	size = min(windowWidth, windowHeight);
	resetFlake()
}
