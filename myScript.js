class todoCards {
    constructor(todoid, todoTitle, dateCreated, todoItems,) {
        this.todoid = todoid;
        this.todoTitle = todoTitle;
        this.dateCreated = dateCreated;
        this.todoItems = [];
    }
}

let cardItems = `<div class="cardItem"><input type="checkbox"><input type="text" class="itemTitle" placeholder="Add Item"</div>`;
let cardArray = [];
let SAVED_CARD_DATA = "savedTodoLists";




(function cardDataRefresh() {
    let cardData = localStorage.getItem(SAVED_CARD_DATA);
    let parsedCard = JSON.parse(cardData);
    for ( let i = 0; i < parsedCard.length; i++ ) {
        let theCard = new todoCards(parsedCard[i].todoid, parsedCard[i].todoTitle, parsedCard[i].dateCreated, parsedCard[i].todoItems)
        cardArray.push(theCard);
        //for ( i = 0; parsedCard[i].todoItems)
        $(".cardcontainer").append(`<div class="card" id="${parsedCard[i].todoid}">
                    <div class="deleteCard" onclick="cardDelete.call(this)"><i class="far fa-times-circle"></i></div>
                    <div class="cardTitle"><input value="${parsedCard[i].todoTitle}" id="cardTitleInput" onkeyup="addTitle.call(this)" type="text" placeholder="ToDo Title">
                    </div>
                    <div class="itemContainer">
                        <div class="addItem" onclick="printItem()"><i class="far fa-plus-square"></i>
                        </div>
                    </div>
                </div>`);
    }
})();

function createCard() {
    let newid = Math.floor(Math.random() * 99999999);
    let newCard =  new todoCards(newid, '',Date(),'');
    cardArray.push(newCard);
    $(".cardContainer").append(`<div class="card" id="${newid}">
                    <div class="deleteCard" onclick="cardDelete.call(this)"><i class="far fa-times-circle"></i></div>
                    <div class="cardTitle"><input id="cardTitleInput" onkeyup="addTitle.call(this)" type="text" placeholder="ToDo Title">
                    </div>
                    <div class="itemContainer">
                        <div class="addItem" onclick="printItem()"><i class="far fa-plus-square"></i>
                        </div>
                    </div>
                </div>`);
    saveCards();

    console.log(newid);
    console.log(newCard);

}


function cardDelete() {
    let toDelete = $(this).parent().attr('id');
    for (let i = 0; i < cardArray.length; i++) {
        if(toDelete == cardArray[i].todoid) {
            cardArray.splice(i, 1);
            $("#" + toDelete).fadeOut( function(){
                $("#" + toDelete).remove();
                saveCards()
            })
        }
        }
}


function addTitle() {
    let titleID = $(this).parent().parent().attr('id');
    let titleVal = $(this).val();
    for (let i = 0; i < cardArray.length; i++) {
        if(titleID == cardArray[i].todoid) {
            cardArray[i].todoTitle = titleVal;
            saveCards();
        }
        }
    }

function printItem() {
    $(".itemContainer").appendChild(`<div class="cardItem"><input type="checkbox"><input type="text" placeholder="Add Item"</div>`);

}

function saveCards() {
    let savedData = JSON.stringify(cardArray);
    localStorage.setItem(SAVED_CARD_DATA,savedData )
}
//let userData = localStorage.getItem("cardData");
//let cardArray = JSON.parse(userData);


/*
function persistSelectedChat() {
let chatString = JSON.stringify.(selectedChat);
localStorage.
*/
