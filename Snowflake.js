
class Particle {

	constructor(x,y) {
		this.x = size/2;
		this.y = random(-1,1);
		this.r = 4;
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
		fill(255);
		ellipse(this.x, this.y, this.r*2, this.r*2);
	}

	showmirror() {
		noStroke();
		fill(255);
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

function setup() {
	main = createCanvas(windowWidth, windowHeight);
	size = min(windowWidth, windowHeight);
	background(0);
	P = new Particle();
}


function draw() {
	translate(width/2, height/2);
	rotate(-PI/2);

	if (!freeze) {

		while (P.checkstop(dP) == false) {
			P.update();
		}
		if (P.checkstop(dP) == true) {
			dP.push(P);
			P = new Particle();
			if (P.checkstop(dP) == true) {
				dP = [];
				//background(0);
				arms = random([4,5,6,7,8,9]);
				freeze = true;
			}
		}

		for (let i=0; i < arms; i++) {
			rotate(2*PI/arms);
			if (dP.length > 0) {
				for (let d of dP) {
					d.show();
					d.showmirror();
				}
			}
		}
	}
}

function keyPressed() {
	background(0);
	freeze = false;
}
