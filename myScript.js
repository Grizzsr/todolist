class todoCards {
    constructor(todoid, todoTitle, dateCreated, todoItems,) {
        this.todoid = todoid;
        this.todoTitle = todoTitle;
        this.dateCreated = dateCreated;
        this.todoItems = [];
    }
}

class item {
    constructor(itemId, itemName) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.itemComplete = false;
    }
}

let cardArray = [];
let SAVED_CARD_DATA = "savedTodoLists";

(function cardDataRefresh() {
    let cardData = localStorage.getItem(SAVED_CARD_DATA);
    let parsedCard = JSON.parse(cardData);
    for ( let i = 0; i < parsedCard.length; i++ ) {
        let theCard = new todoCards(parsedCard[i].todoid, parsedCard[i].todoTitle, parsedCard[i].dateCreated, parsedCard[i].todoItems);
        cardArray.push(theCard);
        $(".cardcontainer").append(`<div class="card" id="${parsedCard[i].todoid}">
                    <div class="deleteCard" onclick="cardDelete.call(this)"><i class="far fa-times-circle"></i></div>
                    <div class="cardTitle"><input value="${parsedCard[i].todoTitle}" id="cardTitleInput" onkeyup="addTitle.call(this)" type="text" placeholder="ToDo Title">
                    </div>
                    <div class="itemContainer">
                        <div class="addItem" ><i  onclick="addItemToCard.call(this)" class="far fa-plus-square"></i>
                        </div>
                    </div>
                </div>`);
        for (let j = 0; j < parsedCard[i].todoItems.length; j++) {
            let theItem = new item(parsedCard[i].todoItems[j].itemId, parsedCard[i].todoItems[j].itemName, parsedCard[i].todoItems[j].itemComplete);
            cardArray[i].todoItems.push(theItem);
            console.log('#' + parsedCard[i].todoid);
            $('#' + parsedCard[i].todoid).find(".addItem:first").append(`<div id="${parsedCard[i].todoItems[j].itemId}" class="cardItem"><input onclick="deleteItem.call(this)" type="checkbox"><input onkeyup="addItemTitle.call(this)" class="itemTitle" placeholder="Add Item" value="${parsedCard[i].todoItems[j].itemName}"</div>`);

        }

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
                        <div class="addItem"  ><i onclick="addItemToCard.call(this)" class="far fa-plus-square"></i>
                        </div>
                    </div>
                </div>`);
    saveCards();

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
    let titleID = $(this).closest(".card").attr('id');
    let titleVal = $(this).val();
    for (let i = 0; i < cardArray.length; i++) {
        if(titleID == cardArray[i].todoid) {
            cardArray[i].todoTitle = titleVal;
            saveCards();
        }
        }
    }

function addItemToCard() {
    let cardid = $(this).closest(".card").attr('id');
    let itemid = Math.floor(Math.random() * 99999999);
    let newItem = new item(itemid, '');
    for ( let i = 0; i < cardArray.length ; i++) {
        if (cardid == cardArray[i].todoid) {
            cardArray[i].todoItems.push(newItem);
        }
    }
        $(this).closest(".addItem").append(`<div id="${itemid}" class="cardItem"><input onclick="deleteItem.call(this)" type="checkbox"><input onkeyup="addItemTitle.call(this)" class="itemTitle" placeholder="Add Item"</div>`);
        saveCards();
}

function addItemTitle() {
    let titleID = $(this).closest(".card").attr('id');
    let itemID = $(this).closest(".cardItem").attr('id');
    let titleVal = $(this).val();
    for (let i = 0; i < cardArray.length; i++) {
        if (titleID == cardArray[i].todoid) {
            for (let j = 0; j < cardArray[i].todoItems.length; j++) {
                if (itemID == cardArray[i].todoItems[j].itemId) {
                    cardArray[i].todoItems[j].itemName = titleVal;
                }
            }
            saveCards();
        }
    }
}

function deleteItem() {
    let titleID = $(this).closest(".card").attr('id');
    let itemToDelete = $(this).closest(".cardItem").attr('id');
    for (let i = 0; i < cardArray.length; i++) {
        if (titleID == cardArray[i].todoid) {
            for (let j = 0; j < cardArray[i].todoItems.length; j++) {
                if (itemToDelete == cardArray[i].todoItems[j].itemId) {
                    cardArray[i].todoItems.splice(j, 1);
                }
            }
            saveCards();
        }
    }
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
