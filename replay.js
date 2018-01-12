let boxsize = 30;
let idx = 0;
let matchLength = Object.keys(data).length-1;
let mapSize = data.Map.length;


function setup() {
	createCanvas(windowWidth,windowHeight);
	textSize(boxsize);
	textAlign(CENTER,CENTER);
	rectMode(CENTER);

	replayButton = createButton('Replay');
	replayButton.position(mapSize*boxsize/2+boxsize, mapSize*boxsize+4*boxsize);
	replayButton.mousePressed(resetmap);
	//replayButton.size(100);
}

function draw() {
	if (idx<matchLength && (frameCount % 5)==0) {
		background(40,150);
		fill(0);
		stroke(0,255,0);
		translate(2*boxsize, 2*boxsize);
		for (let i=0; i<data['Map'].length; i++) {
			for (let j=0; j<data['Map'].length; j++) {
				if (data['Map'][j][i] === 1) {
					rect(i*boxsize, j*boxsize, boxsize, boxsize);
				}
			}
		}
		stroke(0);

		// Drawing Round Counter
		fill(200, 200, 200);
		text('Round '+idx, mapSize*boxsize/2, mapSize*boxsize+20);

		// Drawing Players
		for (var key in data[idx]['players']) {
			let player = data[idx]['players'][key];
			fill(getPlayerColor(key));
			let x = player.x;
			let y = player.y;
			// Depending on player face, set the correct unicode triangle
			if (player.face === 0) {
				push();
				textSize(boxsize+8);
				text('\u25b2',x*boxsize, y*boxsize);
				pop();
			} else if (player.face === 1) {
				text('\u25b6', x*boxsize, y*boxsize);
			} else if (player.face === 2) {
				push();
				textSize(boxsize+8);
				text('\u25bc', x*boxsize, y*boxsize);
				pop();
			} else {
				text('\u25c0', x*boxsize, y*boxsize);
			}

			// Drawing pings
			if (player.pinging) {
				push();
				fill(20,20,20,50);
				stroke(getPlayerColor(key));
				ellipse(x*boxsize,y*boxsize,16*boxsize, 16*boxsize);
				pop();
			}

			// Draw Legend
			let yleg = (2*(key % 50)-1)*boxsize;
			let xleg = mapSize*boxsize+20;
			text('\u25b2', xleg, yleg);
			textAlign(LEFT);
			text(player.name, xleg+boxsize, yleg);
			for (let b=0; b<player.balls; b++) {
				ellipse(xleg+boxsize/2*(3+b), yleg+boxsize, boxsize/2, boxsize/2)
			}
			textAlign(CENTER);
		}

		// Drawing Dodgeballs
		data[idx]['balls'].forEach( function(ball) {
			if (ball[3] == 1) {
				fill(255,0,0);
			} else {
				fill(150,150,150);
			}
			let x = ball[0];
			let y = ball[1];
			ellipse(x*boxsize, y*boxsize, boxsize/2, boxsize/2);
		});

		idx += 1;
	}
}

function mouseClicked() {
	idx += 1;
}

function getPlayerColor( id ) {
	colorMode(HSL);
	let cval = (id % 50)*60;
	c = color(cval,80,60);
	colorMode(RGB);
	return c

}

function resetmap() {
	idx = 0
}

