
let boxpx;
let boxpy;
let col = 0;
let size = 20;


function setup() {
	createCanvas(windowWidth, windowHeight);
	background(50);
	colorMode(HSB)
	boxpx = windowWidth/2;
	boxpy = windowHeight/2;
}

function draw() {
	//noStroke();
	fill(col,100,100);
	rect(boxpx,boxpy, size, size);
	boxpx = (boxpx + size*floor(random(-1,2)) + windowWidth) % windowWidth;
	boxpy = (boxpy + size*floor(random(-1,2)) + windowHeight) % windowHeight;
	col += .1;
	if (col > 300) {
		col = 0;
	}
}
