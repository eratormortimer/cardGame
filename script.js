let textfields = new Map([
    ['inputCooldown', 'cooldown'], 
    ['inputName', 'name']
]);


function init() {

	getTextfields('inputCooldown');
	getTextfields('inputName');
	changeRarity("Common");

}


function getTextfields(inputID){

	fieldID= textfields.get(inputID);
	console.log(fieldID);


//document.getElementById(inputID).addEventListener("onchange", function() {
	setField(fieldID, document.getElementById(inputID).value);
//});

}

function setField(fieldID, input) {
	console.log("setField with "+ input);
	document.getElementById(fieldID).innerHTML = input;

}
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function openDropdown(id) {
    document.getElementById(id).classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function changeRarity(rarity) {

	//delete old rarity image
	var oldR = document.getElementsByClassName("rarity");
	if (oldR.length>0) {
		oldR[0].parentNode.removeChild(oldR[0]); //always only one
    }
	//Background image/color of the card to indicate rarity
	var img = document.createElement("img");
	img.src = "images/rarity-" + rarity + ".png";
	img.id = "rarity-" + rarity;
	img.classList.add("rarity"); 

	var rarityDiv = document.getElementById("wrapper");
	rarityDiv.appendChild(img);
}


