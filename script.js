let textfields = new Map([
    ['inputCooldown', 'cooldown'], 
    ['inputName', 'name']
]);


function init() {

getTextfields('inputCooldown');
getTextfields('inputName');

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
