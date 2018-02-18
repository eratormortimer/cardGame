function init() {
    document.getElementById('jsonform').style.display = 'none';
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
            wrapper.style.background = 'blue';
            break;
        case '2':
            wrapper.style.background = 'red';
            break;
        case '3':
            wrapper.style.background = 'green';
            break;
    }
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
    } else {
        jsonform.style.display = 'none';
        cardcreator.style.display = 'block';
    }
}

function card_from_form(){
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

function update_card(){
    var card = card_from_form();
    show_card(card);
}
