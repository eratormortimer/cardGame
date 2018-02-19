function init() {
    document.getElementById('jsonform').style.display = 'none';
    loadFrame("Common");
}

function show_card (card) {
    document.getElementById('name').innerHTML = card.name;
    document.getElementById('cast').innerHTML = card.cast;
    document.getElementById('cooldown').innerHTML = card.cooldown;
    document.getElementById('ability').innerHTML = card.ability;
    document.getElementById('class').innerHTML = card.class_;
    document.getElementById('edition').innerHTML = card.edition;
    document.getElementById('image').innerHTML = card.image;

    wrapper = document.getElementById('card');
    switch (card.level) {
        case '1':
            loadFrame("Common");
            break;
        case '2':
            loadFrame("Rare");
            break;
        case '3':
            loadFrame("UltraRare");
            break;
        case '4':
            loadFrame("Legendary");
            break;
    }
}

function loadFrame(rarity) {
    console.log('trying to load frame')
    /*
	var img = document.createElement("img");
	img.src = "images/rarity-" + rarity + ".png";
	//img.src ="images/transparent.png";
    //img.style["background-image"] = "url('images/rarity-" + rarity + ".png')";
    img.id = "rarity-" + rarity;
	//img.classList.add("rarity"); 

	var rarityDiv = document.getElementById("wrapper");
	rarityDiv.appendChild(img);
    */

	var img_src = "images/rarity-" + rarity + ".png";
    document.getElementById('card').style.backgroundImage =
        "url(" + img_src + ")";
}

function export_card (card) {
    var json = JSON.stringify(card);
    return json;
}

function import_card (json) {
    var card = JSON.parse(json);
    return card;
}

function parse_card() {
    var json = document.getElementById('jsoninput').value;
    card = import_card (json);
    show_card (card);
}

function switch_view() {
    jsonform = document.getElementById('jsonform');
    cardcreator = document.getElementById('cardcreator');

    // only one of the forms might be visible at the same time
    if (jsonform.style.display == 'none') {
        jsonform.style.display = 'block';
        cardcreator.style.display = 'none';
        update_json_form();
    } else {
        jsonform.style.display = 'none';
        cardcreator.style.display = 'block';
        update_cardcreator();
    }
}

function update_json_form() {
    var card = card_from_form();
    var json = export_card(card);
    document.getElementById('jsoninput').value = json;
}

function update_cardcreator() {
    var json = document.getElementById('jsoninput').value;
    var card = import_card(json);

    document.getElementById('nameform').value = card.name;
    document.getElementById('castform').value = card.cast;
    document.getElementById('cooldownform').value = card.cooldown;
    document.getElementById('imageform').value = card.image;
    document.getElementById('abilityform').value = card.ability;
    document.getElementById('classform').value = card.class_;
    document.getElementById('editionform').value = card.edition;
    document.getElementById('levelform').value = card.level;
}

function card_from_form() {
    var card = {
        name : document.getElementById('nameform').value,
        cast : document.getElementById('castform').value,
        cooldown : document.getElementById('cooldownform').value,
        image : document.getElementById('imageform').value,
        ability : document.getElementById('abilityform').value,
        class_ : document.getElementById('classform').value,
        edition : document.getElementById('editionform').value,
        level : document.getElementById('levelform').value
    };
    return card;
}

function update_card() {
    var card = card_from_form();
    show_card(card);
}
