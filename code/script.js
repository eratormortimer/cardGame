function init() {
    $('#jsonform').css('display','none');
    loadFrame("Common");
}

function show_card (card) {
    $('#name').html('<p>' + card.name + '</p>');
    $('#cast').html('<p>' + card.cast + '</p>');
    $('#cooldown').html('<p>' + card.cooldown + '</p>');
    $('#ability').html('<p>' + card.ability + '</p>');
    $('#class').html('<p>' + card.class_ + '</p>');
    $('#edition').html('<p>' + card.edition + '</p>');
    $('#image').html('<p>' + card.image + '</p>');

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

	var img_src = "../images/rarity-" + rarity + ".png";
    $('#card').css('background-image',"url(" + img_src + ")");
}

function export_card (card) {
    var json = JSON.stringify(card);
    return json;
}

function getCardName(){


    card = card_from_form();
    return card.name;
}

//function to save the json of the card
function saveCard(){
    
    var cardPath = getCardName() + ".json";
    
    var blob = new Blob( [ export_card(card_from_form()) ], {
        type: 'application/octet-stream'
    });
    
    url = URL.createObjectURL( blob );
    var link = document.createElement( 'a' );
    link.setAttribute( 'href', url );
    link.setAttribute( 'download', cardPath );
    
    var event = document.createEvent( 'MouseEvents' );
    event.initMouseEvent( 'click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
    link.dispatchEvent( event );
}

function import_card (json) {
    var card = JSON.parse(json);
    return card;
}

function parse_card() {
    var json = $('#jsoninput').val();
    card = import_card (json);
    show_card (card);
}

function switch_view() {
    jsonform = $('#jsonform');
    cardcreator = $('#cardcreator');

    // only one of the forms might be visible at the same time
    if (jsonform.css('display') == 'none') {
        jsonform.css('display', 'block');
        cardcreator.css('display', 'none');
        update_json_form();
    } else {
        jsonform.css('display', 'none');
        cardcreator.css('display', 'block');
        update_cardcreator();
    }
}

function update_json_form() {
    var card = card_from_form();
    var json = export_card(card);
    $('#jsoninput').val(json);
}

function update_cardcreator() {
    var json = $('#jsoninput').val();
    var card = import_card(json);

    $('#nameform').val(card.name);
    $('#castform').val(card.cast);
    $('#cooldownform').val(card.cooldown);
    $('#imageform').val(card.image);
    $('#abilityform').val(card.ability);
    $('#classform').val(card.class_);
    $('#editionform').val(card.edition);
    $('#levelform').val(card.level);
}

function card_from_form() {
    var card = {
        name : $('#nameform').val(),
        cast : $('#castform').val(),
        cooldown : $('#cooldownform').val(),
        image : $('#imageform').val(),
        ability : $('#abilityform').val(),
        class_ : $('#classform').val(),
        edition : $('#editionform').val(),
        level : $('#levelform').val()
    };
    return card;
}

function update_card() {
    var card = card_from_form();
    show_card(card);
}
