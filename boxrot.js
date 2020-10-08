
let boxpx;
let boxpy;
let col = 0;
let size = 20;


function setup() {
	createCanvas(windowWidth-windowWidth%size, windowHeight-windowHeight%size);
	background(40);
	colorMode(HSB)
	boxpx = windowWidth/2;
	boxpy = windowHeight/2;
}

function draw() {
	//noStroke();
	background(0,0.002);
	fill(col,100,100);
	rect(boxpx,boxpy, size, size);
	if (random() < 0.5) {
		boxpx = (boxpx + size*floor(random(-1,2)) + width) % width;
	} else {
		boxpy = (boxpy + size*floor(random(-1,2)) + height) % height;
	}
	col += .1;
	if (col > 300) {
		col = 0;
	}
}
