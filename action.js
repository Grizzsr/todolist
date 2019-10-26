


let SAVED_CARD_DATA = "savedTodoLists";

Freshdata();
Printpage();

function Freshdata() {
    let cardData = localStorage.getItem(SAVED_CARD_DATA);
    let parsedCard = JSON.parse(cardData);
    for ( let i = 0; i < parsedCard.collection.length; i++ ) {
        let theCard = new todoCards(parsedCard.collection[i].cardid, parsedCard.collection[i].todoTitle, parsedCard.collection[i].todoItems);
        cardArray.collection.push(theCard);
        for (let j = 0; j < parsedCard.collection[i].collection.length; j++) {
            let theItem = new item(parsedCard.collection[i].collection[j].itemName, parsedCard.collection[i].collection[j].itemComplete);
            cardArray.collection[i].collection.push(theItem);
        }
    }
}



function Printpage() {
    $("#cardContainer").html("");
    for (let i = 0; i < cardArray.collection.length; i++) {
        let cards = cardArray.collection[i];
        let items = "";
        for (let j = 0; j < cards.collection.length; j++) {
            items += `<div class="cardItem"><span class="checkcomplete" type="checkbox"></span><input onkeyup="addItemTitle(${i},${j},this.value)" class="itemTitle" value="${cards.collection[j].itemName}" placeholder="Add Item"><span class="itemDelete" onclick="itemDelete(${i}, ${j})"><i class="far fa-times-circle"></i></span> </div>`;
        }
        $("#cardContainer").append(`<div class="card" id=${cards.cardid}>
                    <div class="deleteCard" onclick="cardDelete(${i})"><i class="far fa-times-circle"></i></div>
                    <div class="cardTitle"><input onkeyup="addTitle(${i}, this.value)" value="${cards.todoTitle}" type="text" placeholder="ToDo Title"></div>
                    <div class="itemContainer">
                        <div class="addItem"><i onclick="addItemToCard(${i})" class="far fa-plus-square"></i></div>
                        ${items}
                    </div>
                </div>`);
    }
}

$("#cardContainer").sortable();

function addCard() {
    let newid = Math.floor(Math.random() * 99999999);
    cardArray.add(newid, "");
    saveCards();
    Printpage();
}

function addTitle(cardid, title) {
    cardArray.collection[cardid].todoTitle = title;
    saveCards();
}

function cardDelete(listnumber) {
    cardArray.collection.splice(listnumber, 1);
    saveCards();
    Printpage();
}

function addItemToCard(cardvalue) {
    cardArray.collection[cardvalue].add("","off");
    saveCards();
    Printpage();
}

function addItemTitle(cardid, itemid, title) {
    cardArray.collection[cardid].collection[itemid].itemName = title;
    saveCards();
}

function itemDelete(cardid, itemid) {
    cardArray.collection[cardid].collection.splice(itemid, 1);
    saveCards();
    Printpage();
}

function saveCards() {
    let savedData = JSON.stringify(cardArray);
    localStorage.setItem(SAVED_CARD_DATA,savedData )
}
