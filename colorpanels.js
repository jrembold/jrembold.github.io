
let cols = 10;
let rows;
let size;
let cell_list = [];
let change = 0.5;
let mincol = 0;
let maxcol = 360;

class cell {

	constructor(position, size, min=0, max=360) {
		this.position = position.copy();
		this.size = size;
		this.hue = random(min, max);
		this.rate = change;
		this.min = min;
		this.max = max;
	}

	draw() {
		// Draw the desired square
		fill(this.hue, 70, 100);
		noStroke();
		rect(this.position.x, this.position.y, this.size);
	}

	update() {
		//Update the rate according to change but keep the current direction
		this.rate = Math.sign(this.rate)*change;
		if (this.hue > this.max) {
			this.rate *= -1;
			this.hue = this.max; // Ensuring no overflow
		} else if (this.hue < this.min) {
			this.rate *= -1;
			this.hue = this.min; // Ensuring no underflow
		}
		this.hue += this.rate;
	}

}

function draw_grid() {
	// Generates the list of cell objects
	for (let r=0; r < rows; r++) {
		for (let c=0; c < cols; c++) {
			ncell = new cell(createVector(c*size,r*size), size, mincol, maxcol);
			cell_list.push(ncell);
		}
	}
}


function setup() {
	createCanvas(windowWidth, windowHeight);
	size = windowWidth / cols;
	rows = int(windowHeight / size) + 1;
	background(40);
	colorMode(HSB);
	textAlign(CENTER, CENTER);
	textSize(32);

	draw_grid();
	cell_list.forEach(element => element.draw());
}

function draw() {
	background(0);
	// If control is pressed, show the lower color picker interface
	if (keyIsDown(CONTROL)) {
		fill(mincol, 70, 100);
		ex_size = min(windowWidth, windowHeight)/4;
		rect(windowWidth/2-ex_size/2, windowHeight/2 - ex_size/2, ex_size);
		text('Minimum Color of Range', windowWidth/2, windowHeight/2 - ex_size/2 - 32);
	// if alt is pressed, show the upper color picker interface
	} else if (keyIsDown(ALT)) {
		fill(maxcol, 70, 100);
		ex_size = min(windowWidth, windowHeight)/4;
		rect(windowWidth/2-ex_size/2, windowHeight/2 - ex_size/2, ex_size);
		text('Maximum Color of Range', windowWidth/2, windowHeight/2 - ex_size/2 - 32);
	// Otherwise, just display and update the cells
	} else {
		cell_list.forEach(element => element.update());
		cell_list.forEach(element => element.draw());
	}
}

function mouseWheel(event) {
	// Shift + Scroll adjusts size of boxes
	if (keyIsDown(SHIFT)) {
		if (Math.sign(event.delta) < 0) {
			cols += 1;
		} else {
			cols -= 1;
		}
		cell_list = [];
		setup();

	// Control + Scroll adjusts lower color bound
	} else if (keyIsDown(CONTROL)) {
		if (Math.sign(event.delta) < 0) {
			mincol += 5;
			if (mincol > 360) {mincol = 360;}
		} else {
			mincol -= 5;
			if (mincol < 0) {mincol = 0;}
		}
	// Alt + Scroll adjusts upper color bound
	} else if (keyIsDown(ALT)) {
		if (Math.sign(event.delta) < 0) {
			maxcol += 5;
			if (maxcol > 360) {maxcol=360;}
		} else {
			maxcol -= 5;
			if (maxcol < 0) {maxcol=0;}
		}

	// Normal scroll adjusts rate of color change
	} else {
		change -= event.delta/500;
		if (change > 5) {
			change = 5;
		} else if (change < 0.01) {
			change = 0.01;
		}
	}
	return false; // to not actually scroll the page
}

function keyReleased() {
	// Refresh the cells if colors changed
	if (keyCode == CONTROL | keyCode == ALT) {
		cell_list = [];
		setup();
	}
}
