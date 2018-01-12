let boxsize = 30;
let idx = 0;


function setup() {
	createCanvas(windowWidth,windowHeight);
}

function draw() {
	background(255);
	fill(0);
	noStroke();
	translate(2*boxsize, 2*boxsize);
	for (let i=0; i<data['Map'].length; i++) {
		for (let j=0; j<data['Map'].length; j++) {
			if (data['Map'][i][j] === 1) {
				rect(i*boxsize, j*boxsize, boxsize-1, boxsize-1);
			}
		}
	}

	for (var key in data[idx]['players']) {
		fill(255,0,255);
		let x = data[idx]['players'][key].x;
		let y = data[idx]['players'][key].y;
		if (data[idx]['players'][key].face === 0) {
			arc(x*boxsize, y*boxsize, boxsize, boxsize, -PI/4, -3*PI/4);
		} else if (data[idx]['players'][key].face === 1) {
			arc(x*boxsize, y*boxsize, boxsize, boxsize, PI/4, -PI/4);
		} else if (data[idx]['players'][key].face === 2) {
			arc(x*boxsize, y*boxsize, boxsize, boxsize, 3*PI/4, PI/4);
		} else {
			arc(x*boxsize, y*boxsize, boxsize, boxsize, -3*PI/4, 3*PI/4);
		}
	}
}

function mouseClicked() {
	idx += 1;
}
