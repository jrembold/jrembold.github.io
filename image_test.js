
let img;
let moves = [];
let mousecol;
let rows = [];
let button;
let input;

function preload() {
	img = loadImage('coded_img.png');
}

function setup() {
	pixelDensity(1);
	input = select('#inputfield');
	button = createButton("Decode");
	createCanvas(img.width,img.height);
	mouseview = createImage(300,300);
	mousecol = createImage(img.width, img.height);
	mousecol.copy(img, 0, 0, img.width, img.height, 0, 0, mousecol.width, mousecol.height);
	image(img, 0, 0);

	button.mousePressed(decode);


}

function transcribeBlock(thisimage) {
	thisimage.loadPixels();
	const tmp = thisimage.pixels.slice();
	let dir = 1;
	for (let i = 0; i < thisimage.width; i++) {
		for (let j = 0; j < thisimage.height; j++) {
			shift = dir * moves[i % moves.length];
			row = ((j + shift) % thisimage.height + thisimage.height) % thisimage.height;
			rows.push(row);
			index = 4 * ( j * thisimage.width +  i);
			shiftedindex = 4 * ( row * thisimage.width +  i);
			thisimage.pixels[index]   = tmp[shiftedindex];
			thisimage.pixels[index+1] = tmp[shiftedindex+1];
			thisimage.pixels[index+2] = tmp[shiftedindex+2];
			thisimage.pixels[index+3] = 255;

		}
		dir = dir * -1;
	}
	thisimage.updatePixels();
}

function decode() {
	//mousecol = createImage(img.width, img.height);
	mousecol.copy(img, 0, 0, img.width, img.height, 0, 0, mousecol.width, mousecol.height);
	pswrd = input.value();
	moves = []
	for (i=0; i < pswrd.length; i++){
		moves.push(1*pswrd.charCodeAt(i));
	}
	console.log(moves)

	transcribeBlock(mousecol);
}


function draw() {
	xmin = mouseX - mouseview.width / 2
	xmax = mouseX + mouseview.width / 2
	ymin = mouseY - mouseview.height/ 2
	ymax = mouseY + mouseview.height/ 2


	background(0);
	image(img, 0, 0);
	mouseview.copy(mousecol, xmin, ymin, 300, 300, 0, 0, 300, 300);
	image(mouseview, xmin, ymin);
	
}
