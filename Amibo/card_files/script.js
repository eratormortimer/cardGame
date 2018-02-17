//alert(localStorage.getItem("savestate"));
var SMASH = "smashbros";
var counts = {
  smashbros: 44,
  supermario: 6,
  splatoon: 3,
  wooly: 3
};
var MARIO = "supermario";
var SPLATOON = "splatoon";
var WOOLY = "wooly";

var saves = {};
//localStorage.setItem("savestate", null);
function init() {
	if ('addEventListener' in document) {
    	document.addEventListener('DOMContentLoaded', function() {
        	FastClick.attach(document.body);
    	}, false);
	}	
	console.log("init");
	//addEpisodes();
  addAmiibos();
	loadSaveState(SMASH);
  loadSaveState(MARIO);
  loadSaveState(SPLATOON);
  loadSaveState(WOOLY);
}

function loadSaveState(key) {
	var raw = localStorage.getItem(key);
	console.log(raw);

	if (raw == null || raw == undefined) {
		console.log("init new save");
		saves[key] = new Array();
		saveSaveState(key);
	} else {
		saves[key] = raw.split(",");
		for (var i = 0; i < saves[key].length; i++) {
			saves[key][i] = parseInt(saves[key][i]);
		}
	}

	setCheckMarks(key);
}

function addAmiibos() {
  loadCollection(SMASH);
  loadCollection(MARIO);
  loadCollection(SPLATOON);
  loadCollection(WOOLY);
}

function loadCollection(key) {
  var content = document.getElementById("content");
  
  for (var i = 1; i <= counts[key]; i++) {
      var entry = buildEntry(i, key);
      
      content.appendChild(entry);
   
  }
}

function buildEntry(nr, key) {
  
  //the main image
  var img = document.createElement("img");
  img.src = "img/not.png";
  img.style["background-image"] = "url('img/" + key + "/" + numberGen(nr) + ".png')";
  img.className = "amiibopic";
  img.id = "" + key + nr;
  img.addEventListener("click", function() {
    toggle(nr, key, img);
}, false);
    
  return img;
}

function saveSaveState(key) {
	if (saves == null) {
		localStorage.setItem(key, "");
	} else {
		console.log("save:" + key);
		localStorage.setItem(key, saves[key]);
	}
}

function setCheckMarks(key) {
	for (var i = 0; i < saves[key].length; i++) {
		var nr = saves[key][i];
		console.log("check number: " + nr);
		toggleOn(nr, key);

	};
}



function toggle(nr, key, target) {
  console.log("nr: " + nr + " key: " + key);
  var hit = saves[key].indexOf(nr) > -1;
  console.log("hit: " + hit);
  
  if (target.src.indexOf("img/not.png") > -1) {
      target.src = "img/check.png";
      
      if (hit == false) {
			saves[key][saves[key].length] = nr;
      
			console.log(saves);
		}
  } else {
    target.src = "img/not.png";
    
    //remove if there
		if (hit == true) {
			var index = saves[key].indexOf(nr);
			saves[key].splice(index, 1);
		}
  }
  
	saveSaveState(key);
}

function toggleOn(nr, key) {
	if (nr == 0 || isNaN(nr)) return;

	var img = document.getElementById("" + key + nr);
	 img.src = "img/check.png";
}

function numberGen(number) {
  if (number < 10) return "00" + number;
  else if (number < 100) return "0" + number;
  else return "" + number;
}
