var dim = 7;
var room = {};
var undoboard = null;
var gameinit = false;
var playable = true;
var manual = false;
var boardmaskfrom = [ 7,  6,  1,  0,  0,  1,  1,  0,  0,  1,  6,  7];
var boardmaskto =   [12, 13, 18, 19, 19, 18, 18, 19, 19, 18, 13, 12];

var pc = [
	[[0, 0, 0], [1, 0, 0], [1, 1, 0], [1, 1, 1], [2, 0, 0], [2, 1, 0], [2, 2, 0]], // A
	[[0, 0, 0], [1, 0, 0], [1, 2, 0], [1, 2, 2], [3, 0, 0], [3, 2, 0], [3, 2, 2]], // B
	[[0, 0, 0], [2, 0, 0], [2, 1, 0], [2, 1, 1], [3, 0, 0], [3, 2, 0], [3, 2, 2]], // C
	[[0, 0, 0], [2, 0, 0], [2, 1, 0], [2, 1, 2], [3, 0, 0], [3, 2, 0], [3, 2, 2]], // D
	[[0, 0, 0], [2, 0, 0], [2, 2, 0], [2, 2, 1], [3, 0, 0], [3, 2, 0], [3, 2, 2]], // E
	[[0, 0, 0], [2, 0, 0], [2, 1, 0], [2, 1, 2], [3, 0, 0], [3, 2, 0], [3, 2, 1]], // F
	[[0, 0, 0], [2, 0, 0], [2, 1, 0], [2, 1, 2], [3, 0, 0], [1, 0, 0], [1, 1, 0]], // G
	[[0, 0, 0], [1, 0, 0], [1, 2, 0], [1, 2, 1], [3, 0, 0], [3, 2, 0], [3, 2, 2]], // H
	[[0, 0, 0], [1, 0, 0], [1, 2, 0], [2, 0, 0], [2, 2, 0], [2, 2, 1], [3, 0, 0]], // I
	[[0, 0, 0], [1, 0, 0], [1, 1, 0], [1, 1, 2], [3, 0, 0], [3, 2, 0], [3, 2, 1]], // J
	[[0, 0, 0], [1, 0, 0], [1, 1, 0], [1, 2, 0], [3, 0, 0], [3, 2, 0], [3, 1, 0]], // K
	[[0, 0, 0], [1, 0, 0], [2, 0, 0], [2, 2, 0], [3, 0, 0], [3, 2, 0], [3, 1, 0]], // L
	[[0, 0, 0], [1, 0, 0], [1, 2, 0], [2, 0, 0], [2, 1, 0], [2, 1, 2], [3, 0, 0]], // M
	[[0, 0, 0], [1, 0, 0], [2, 0, 0], [2, 2, 0], [2, 2, 2], [3, 0, 0], [3, 1, 0]], // N
	[[0, 0, 0], [1, 0, 0], [1, 2, 0], [2, 0, 0], [2, 2, 0], [3, 0, 0], [3, 2, 0]], // O
	[[0, 0, 0], [1, 0, 0], [1, 2, 0], [2, 0, 0], [2, 2, 0], [3, 0, 0], [3, 1, 0]], // P
	[[0, 0, 0], [1, 0, 0], [1, 1, 0], [1, 1, 2], [2, 0, 0], [2, 1, 0], [2, 1, 2]], // Q
	[[0, 0, 0], [1, 0, 0], [1, 1, 0], [1, 2, 0], [2, 0, 0], [2, 2, 0], [2, 2, 1]], // R
	[[0, 0, 0], [1, 0, 0], [1, 2, 0], [1, 2, 2], [2, 0, 0], [3, 0, 0], [3, 2, 0]], // S
	[[0, 0, 0], [1, 0, 0], [1, 1, 0], [2, 0, 0], [2, 1, 0], [2, 1, 1], [3, 0, 0]], // T
	[[0, 0, 0], [1, 0, 0], [1, 1, 0], [1, 1, 2], [3, 0, 0], [3, 1, 0], [3, 2, 0]], // U
	[[0, 0, 0], [1, 0, 0], [1, 2, 0], [2, 0, 0], [2, 2, 0], [3, 0, 0], [1, 1, 0]], // V
	[[0, 0, 0], [1, 0, 0], [2, 0, 0], [2, 1, 0], [2, 1, 1], [3, 0, 0], [3, 2, 0]], // W
	[[0, 0, 0], [1, 0, 0], [2, 0, 0], [2, 1, 0], [3, 0, 0], [3, 2, 0], [3, 2, 1]], // X
];
var cl  = [
	"#008b8b", "#ff6347", "#778899", "#228b22", "#d2b48c", "#8fbc8f", "#da70d6",
	"#ff8c00", "#6b8e23", "#808080", "#daa520", "#1e90ff", "#b8860b", "#00ced1",
	"#bdb76b", "#fa8072", "#ee82ee", "#5f9ea0", "#cd5c5c", "#dc143c", "#00fa9a",
	"#ffd700", "#7b68ee", "#3cb371"
];
var offset = [
	[[-1, 0], [-1, 0], [0, 1], [1, 0], [1, 0], [0, -1]],
	[[1, 0], [0, -1], [-1, 0], [-1, 0], [0, 1], [1, 0]],
	[[0, 1], [1, 0], [1, 0], [0, -1], [-1, 0], [-1, 0]],
];
var ag = Array(24).fill(1);
var mr = Array(24).fill(1);
var ps = Array(24).fill([-1, -1]);
var selected_piece = 0;
var pending = [];
var remove_pending = [];
var stored = [];
var stored_pieces = [];
var undo_data = [];

function undo() {
	if (undo_data.length == 1) {
		return;
	}
	undo_data.pop();
	if (undo_data.length > 0) {
		load_board(undo_data[undo_data.length - 1]);
	}
	console.log(undo_data.length);
}

function undo_push() {
	undo_data.push({
		position: ps.concat(),
		mirror: mr.concat(),
		angle: ag.concat(),
		storedpieces: stored_pieces.concat()
	});
	console.log(undo_data.length);
}

function save() {
	var filename = window.prompt("Save file name", "heptamond");
	if (filename === null) {
		return;
	}
	var data = JSON.stringify({position: ps, mirror: mr, angle: ag, storedpieces: stored_pieces});
	var a = document.createElement("a");
	a.download = filename + ".json";
	a.href = URL.createObjectURL(new Blob([data], {type: "text.plain"}));
	a.dataset.downloadurl = ["text/plain", a.download, a.href].join(":");
	a.click();
}

function init_load() {
	var file = document.querySelector('#getfile');
	file.onchange = function () {
		var fileList = file.files;
		var reader = new FileReader();
		reader.readAsText(fileList[0]);
		reader.onload = function  () {
			console.log(reader.result);
			load_board(JSON.parse(reader.result));
		};
	};
}

function load() {
	document.getElementById("getfile").click();
}

function load_board(data) {
	console.log(data);
	ps = [];
	ps = data.position.concat();
	ag = [];
	ag = data.angle.concat();
	mr = [];
	mr = data.mirror.concat();
	selected_piece = -1;
	pending = [];
	remove_pending = [];
	stored = [];
	stored_pieces = [];
	stored_pieces = data.storedpieces.concat();

	draw_board();
	draw_pieces();

	for(var k = 0; k < stored_pieces.length; k++) {
		var a = stored_pieces[k];
		var coords = piece_coordinates(a, ps[a][0], ps[a][1]);
		for(var i = 0; i < 7; i++) {
			var pos_x = coords[i][0];
			var pos_y = coords[i][1];
			var tri = document.getElementById("board" + String(pos_x) + ":" + String(pos_y));
			if ((pos_x + pos_y) % 2 != 0) {
				tri.style.borderTopColor = cl[a];
			} else {
				tri.style.borderBottomColor = cl[a];
			}
			stored.push([pos_x, pos_y, a]);
		}
		piece_on(a, false);
	}
}

function addattr(element) {
	element.setAttribute("onmouseover", "mouseover(this)");
	element.setAttribute("onmouseout", "mouseout(this)");
	element.setAttribute("onclick", "mouseclick(this)");
}

function newgame(dimension) {
	dim = dimension;
	start();
}

var el_board, el_piece;

function start() {
	gameinit = true;
	manual = false;
	draw_board();
	draw_pieces();
	init_load();
	undo_push();
	el_board = document.querySelector("div#board");
	el_board.onwheel = wheel;
	el_piece = document.querySelector("table#piece");
	el_piece.onwheel = wheel;
}

function piece_coordinates(a, x, y) {
	var coords = [];
	for (var i = 0; i < 7; i++) {
		var pos_x = x;
		var pos_y = y;
		var angle = ag[a];
		for (var j = 0; j < 3; j++) {
			if (angle < 0) {
				angle = angle + 6;
			} else if (angle > 5) {
				angle = angle - 6;
			}
			// position offset
			if (pc[a][i][j] == 0) {
				break;
			}
			pos_x = pos_x + mr[a] * offset[pc[a][i][j] - 1][angle][0];
			pos_y = pos_y + offset[pc[a][i][j] - 1][angle][1];
			// angle
			if (pc[a][i][j] == 1) {
				angle = angle + 1;
			} else if (pc[a][i][j] == 2) {
				angle = angle - 1;
			} else if (pc[a][i][j] == 3) {
				angle = angle - 3;
			}
		}
		coords.push([pos_x, pos_y]);
	}
	return coords;
}

function draw_piece(box, a, on) {
	var alpha = "";
	if (!on) {
		alpha = "11";
	}
	var coords = piece_coordinates(a, 4 - ((ag[a] + 1) % 2), 2);
	for (var i = 0; i < 7; i++) {
		var pos_x = coords[i][0];
		var pos_y = coords[i][1];
		var tri = document.createElement("div");
		tri.style.top = pos_y * 19;
		tri.style.left = pos_x * 11;
		if ((pos_x + pos_y) % 2 == 0) {
			tri.className = "tri tri_up_p";
			tri.style.borderTopColor = cl[a] + alpha;
		} else {
			tri.className = "tri tri_dn_p";
			tri.style.borderBottomColor = cl[a] + alpha;
		}
		tri.id = "piece_tri" + String(a) + ":" + String(i);
		//tri.innerHTML += String(i);
		box.appendChild(tri);
	}
}

function piece_on(a, on) {
	var box = document.getElementById("piece" + String(a));
	//while (box.firstChild) box.removeChild(box.firstChild);
	clearInner(box);
	draw_piece(box, a, on);
}

function clearInner(node) {
  while (node.hasChildNodes()) {
    clear(node.firstChild);
  }
}

function clear(node) {
  while (node.hasChildNodes()) {
    clear(node.firstChild);
  }
  node.parentNode.removeChild(node);
  //console.log(node, "cleared!");
}

function draw_pieces() {
	var table = document.getElementById("piece");
	var tr;

	//while (table.firstChild) table.removeChild(table.firstChild);
	clearInner(table);
	for (var a = 0; a < pc.length; a++) {
		if (a % 5 == 0) {
			tr = document.createElement("tr");
		}
		var box = document.createElement("div");
		box.className = "piece_box";
		if (a == selected_piece) {
			box.className += " selected_box";
		}
		draw_piece(box, a, true);
		var td = document.createElement("td");
		box.id = "piece" + String(a);
		box.setAttribute("onclick", "mouseclick(this)");
		td.appendChild(box);
		tr.appendChild(td);
		if (a % 5 == 4) {
			table.appendChild(tr);
		}
	}
	if (pc.length % 5 != 0) {
		table.appendChild(tr);
	}
}

function draw_board() {
	var div = document.getElementById("board");
	// clear game board
	//while (div.firstChild) div.removeChild(div.firstChild);
	clearInner(div);

	for (var i = 0; i < 20; i++) {
		for (var j = 0; j < 12; j++) {

			// mask
			if (i <= boardmaskfrom[j] || i > boardmaskto[j]) {
				continue;
			}

			// room
			var tri = document.createElement("div");
			tri.style.top = j * 43;
			tri.style.left = i * 25;
			if ((i + j) % 2 != 0) {
				tri.className = "tri tri_up";
			} else {
				tri.className = "tri tri_dn";
			}
			tri.id = "board" + String(i) + ":" + String(j);
			addattr(tri);
			div.appendChild(tri);
		}
	}
}

function dump_stored_pieces() {
	var dump = "";
	for(var i = 0; i < stored_pieces.length; i++) {
		dump += " " + String(stored_pieces[i]);
	}
	alert("stored_pieces:" + dump);
}

function mouseclick(element) {
	if (element.id.startsWith("piece")) {
		var index = parseInt(element.id.substr(5));
		if (index != selected_piece) {
			//dump_stored_pieces();
			for(var i = 0; i < stored_pieces.length; i++) {
				if (index == stored_pieces[i]) {
					return;
				}
			}
			if (selected_piece >= 0) {
				var prev = document.getElementById("piece" + String(selected_piece));
				prev.className = "piece_box";
			}
			selected_piece = index;
			var curr = document.getElementById(element.id);
			curr.className = "piece_box selected_box";
		} else {
			ag[index] = ag[index] + 1;
			if (ag[index] == 6) {
				ag[index] = 0;
				mr[index] = mr[index] * -1;
			}
			var box = document.getElementById(element.id);
			//while (box.firstChild) box.removeChild(box.firstChild);
			clearInner(box);
			draw_piece(box, index, true);
		}
	}
	if (element.id.startsWith("board")) {
		var indeces = element.id.substr(5).split(":");
		var x = parseInt(indeces[0]);
		var y = parseInt(indeces[1]);

		// store a piece
		var on_pending = false;
		for(var i = 0; i < pending.length; i++) {
			if (x == pending[i][0] && y == pending[i][1]) {
				on_pending = true;
				break;
			}
		}
		if (on_pending) {
			for(var i = 0; i < pending.length; i++) {
				stored.push([pending[i][0], pending[i][1], selected_piece]);
			}
			pending = [];
			stored_pieces.push(selected_piece);
			piece_on(selected_piece, false);
			var prev = document.getElementById("piece" + String(selected_piece));
			prev.className = "piece_box";
			var not_stored = -1;
			for (l = 0; l < 24; l++) {
				var m = 0;
				for ( ; m < stored_pieces.length; m++) {
					if (l == stored_pieces[m]) {
						break;
					}
				}
				if (m == stored_pieces.length) {
					not_stored = l;
					break;
				}
			}
			selected_piece = not_stored;
			if (selected_piece >= 0) {
				var curr = document.getElementById("piece" + String(selected_piece));
				curr.className = "piece_box selected_box";
			}
			undo_push();
			return;
		}

		// remove a piece
		var at = -1;
		for(var i = 0; i < stored.length; i++) {
			if (x == stored[i][0] && y == stored[i][1]) {
				at = i;
				break;
			}
		}
		if (at >= 0) {
			remove = stored[at][2];

			// erase piece on board
			for(var i = 0; i < stored.length; i++) {
				if (stored[i][2] == remove) {
					var pos_x = stored[i][0];
					var pos_y = stored[i][1];
					var tri = document.getElementById("board" + String(pos_x) + ":" + String(pos_y));
					if ((pos_x + pos_y) % 2 != 0) {
						tri.style.borderTopColor = "#EEEEEE";
					} else {
						tri.style.borderBottomColor = "#E0E0E0";
					}
				}
			}
			remove_pending = [];
			piece_on(remove, true);

			// remake stored
			var new_stored = [];
			for(var i = 0; i < stored.length; i++) {
				if (stored[i][2] != remove) {
					new_stored.push(stored[i]);
				}
			}
			stored = new_stored;

			// remake stored_pieces
			var new_stored_pieces = [];
			for(var i = 0; i < stored_pieces.length; i++) {
				if (stored_pieces[i] != remove) {
					new_stored_pieces.push(stored_pieces[i]);
				}
			}
			stored_pieces = new_stored_pieces;
			//dump_stored_pieces();

			// set selected piece
			if (selected_piece >= 0) {
				var prev = document.getElementById("piece" + String(selected_piece));
				prev.className = "piece_box";
			}
			selected_piece = remove;
			var curr = document.getElementById("piece" + String(selected_piece));
			curr.className = "piece_box selected_box";

			undo_push();
		}
	}
}

function clear_pending() {
	for(var i = 0; i < pending.length; i++) {
		var pos_x = pending[i][0];
		var pos_y = pending[i][1];
		// mask
		if (pos_x <= boardmaskfrom[pos_y] || pos_x > boardmaskto[pos_y]) {
			continue;
		}
		var tri = document.getElementById("board" + String(pos_x) + ":" + String(pos_y));
		if ((pos_x + pos_y) % 2 != 0) {
			tri.style.borderTopColor = "#EEEEEE";
		} else {
			tri.style.borderBottomColor = "#E0E0E0";
		}
	}
	pending = [];
}

function clear_remove_pending() {
	for(var i = 0; i < remove_pending.length; i++) {
		var pos_x = remove_pending[i][0];
		var pos_y = remove_pending[i][1];
		var tri = document.getElementById("board" + String(pos_x) + ":" + String(pos_y));
		if ((pos_x + pos_y) % 2 != 0) {
			tri.style.borderTopColor = cl[remove_pending[i][2]];
		} else {
			tri.style.borderBottomColor = cl[remove_pending[i][2]];
		}
	}
	remove_pending = [];
}

function draw_pending_piece(x, y) {
	clear_remove_pending();
	if (selected_piece < 0) {
		return false;
	}
	if ((x + y) % 2 != ag[selected_piece] % 2) {
		return false;
	}
	var coords = piece_coordinates(selected_piece, x, y);
	for(var i = 0; i < 7; i++) {
		var pos_x = coords[i][0];
		var pos_y = coords[i][1];
		// mask
		if (pos_y < 0 || pos_y > 11) {
			return false;
		}
		if (pos_x <= boardmaskfrom[pos_y] || pos_x > boardmaskto[pos_y]) {
			return false;
		}
		// stored
		for(var j = 0; j < stored.length; j++) {
			if (pos_x == stored[j][0] && pos_y == stored[j][1]) {
				return false;
			}
		}
	}
	clear_pending();
	for(var i = 0; i < 7; i++) {
		var pos_x = coords[i][0];
		var pos_y = coords[i][1];
		var tri = document.getElementById("board" + String(pos_x) + ":" + String(pos_y));
		if ((pos_x + pos_y) % 2 != 0) {
			tri.style.borderTopColor = cl[selected_piece];
		} else {
			tri.style.borderBottomColor = cl[selected_piece];
		}
		pending.push([pos_x, pos_y]);
	}
	return true;
}

function mouseover(element) {
	if (element.id.startsWith("board")) {
		var indeces = element.id.substr(5).split(":");
		var x = parseInt(indeces[0]);
		var y = parseInt(indeces[1]);

		// remove piece pending
		clear_remove_pending();
		var at = -1;
		for(var i = 0; i < stored.length; i++) {
			if (x == stored[i][0] && y == stored[i][1]) {
				at = i;
				break;
			}
		}
		if (at >= 0) {
			clear_pending();
			var remove = stored[at][2];
			// erase piece on board
			for(var i = 0; i < stored.length; i++) {
				if (stored[i][2] == remove) {
					var pos_x = stored[i][0];
					var pos_y = stored[i][1];
					var tri = document.getElementById("board" + String(pos_x) + ":" + String(pos_y));
					if ((pos_x + pos_y) % 2 != 0) {
						tri.style.borderTopColor = cl[remove] + "CC";
					} else {
						tri.style.borderBottomColor = cl[remove] + "CC";
					}
					remove_pending.push([pos_x, pos_y, remove]);
				}
			}
			return;
		}

		// new pending piece
		if (draw_pending_piece(x, y)) {
			ps[selected_piece] = [x, y];
		}
	}
}

function mouseout(element) {
}

function wheel(event) {
	event.preventDefault();
	//console.log(event.deltaY);
	if (selected_piece >= 0) {
		if (event.deltaY > 0) {
			ag[selected_piece] = ag[selected_piece] + 1;
		} else {
			ag[selected_piece] = ag[selected_piece] - 1;
		}
		if (ag[selected_piece] == 6) {
			ag[selected_piece] = 0;
			mr[selected_piece] = mr[selected_piece] * -1;
		}
		if (ag[selected_piece] == -1) {
			ag[selected_piece] = 5;
			mr[selected_piece] = mr[selected_piece] * -1;
		}
		var box = document.getElementById("piece" + String(selected_piece));
		//while (box.firstChild) box.removeChild(box.firstChild);
		clearInner(box);
		draw_piece(box, selected_piece, true);
		// draw piece on the board
		draw_pending_piece(ps[selected_piece][0], ps[selected_piece][1]);
	}
}
