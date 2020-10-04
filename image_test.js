
let img;
let col;
let pswrd;
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
	input = createInput('Enter Password:');
	button = createButton("Decode");
	createCanvas(img.width,img.height);
	col = color(255,255,0);
	mouseview = createImage(300,300);
	mousecol = createImage(img.width, img.height);
	mousecol.copy(img, 0, 0, img.width, img.height, 0, 0, mousecol.width, mousecol.height);
	image(img, 0, 0);

	button.mousePressed(decode);


}

function transcribeBlock(img) {
	img.loadPixels();
	const tmp = img.pixels.slice();
	let dir = 1;
	for (let i = 0; i < img.width; i++) {
		for (let j = 0; j < img.height; j++) {
			shift = dir * moves[i % moves.length];
			row = ((j + shift) % img.height + img.height) % img.height;
			rows.push(row);
			index = 4 * ( j * img.width +  i);
			shiftedindex = 4 * ( row * img.width +  i);
			img.pixels[index]   = tmp[shiftedindex];
			img.pixels[index+1] = tmp[shiftedindex+1];
			img.pixels[index+2] = tmp[shiftedindex+2];
			img.pixels[index+3] = 255;

		}
		dir = dir * -1;
	}
	img.updatePixels();
}

function decode() {
	pswrd = input.value();
	for (i=0; i < pswrd.length; i++){
		moves.push(30*pswrd.charCodeAt(i));
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
