var dim = 7;
var room = {};
var undoboard = null;
var gameinit = false;
var playable = true;
var manual = false;
var boardmaskfrom = [ 7,  6,  1,  0,  0,  1,  1,  0,  0,  1,  6,  7];
var boardmaskto =   [12, 13, 18, 19, 19, 18, 18, 19, 19, 18, 13, 12];

function addattr(element) {
	element.setAttribute("onmouseover", "mouseover(this)");
	element.setAttribute("onmouseout", "mouseout(this)");
	element.setAttribute("onclick", "mouseclick(this)");
}

function newgame(dimension) {
	dim = dimension;
	start();
}

function start() {
	gameinit = true;
	manual = false;
	draw_board();
	//request_quoridor_data({action:"Init", board:{dimension:dim}});
}

function draw_board() {
	var div = document.getElementById("board");
	// clear game board
	while (div.firstChild) div.removeChild(div.firstChild);

	for (i = 0; i < 20; i++) {
		for (j = 0; j < 12; j++) {

			// mask
			if (i <= boardmaskfrom[j] || i > boardmaskto[j]) {
				continue;
			}

			// room
			var tri = document.createElement("div");
			if ((i + j) % 2 != 0) {
				tri.className = "tri tri_up";
				tri.style.top = j * 43;
				tri.style.left = i * 25;
			} else {
				tri.className = "tri tri_dn";
				tri.style.top = j * 43 + 11;
				tri.style.left = i * 25 - 6;
			}
			tri.id = String(i) + String(j);
			addattr(tri);
			div.appendChild(tri);
		}
	}
}

// Wall UI functions

function mouseclick(element) {
}

function mouseover(element) {
}

function mouseout(element) {
}
