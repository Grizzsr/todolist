class todoCards {
    constructor(todoid, todoTitle, dateCreated, todoItems,) {
        this.todoid = todoid;
        this.todoTitle = todoTitle;
        this.dateCreated = dateCreated;
        this.todoItems = [];
    }
}

let todoCard = `<div class="card">
        <div class="deleteCard" onclick="cardDelete.call(this)"><i class="far fa-times-circle"></i></div>
        <div class="cardTitle" ><input onkeyup="addTitle.call(this)" type="text" placeholder="ToDo Title">
        </div>
        <div class="itemContainer">
        <div class="addItem" onclick="addItems()"><i class="far fa-plus-square"></i>
        </div>
        </div>
        </div>`;

let cardItems = `<div class="cardItem"><input type="checkbox"><input type="text" class="itemTitle" placeholder="Add Item"</div>`;

let cardArray = [];

//self invoking function here that grabs local storage and adds to cardArray

function createCard() {
    $(".cardContainer").append(todoCard);
    let newid = Math.floor(Math.random() * 99999999);
    let newCard =  new todoCards(newid, '',Date(),'');
    cardArray.push(newCard);
    $(".card:last").attr('id', newid);
    JSON.stringify(cardArray);
    localStorage.setItem("cardData", cardArray);

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
                JSON.stringify(cardArray);
                localStorage.setItem("cardData", cardArray);
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
        }
        }
    }

function addItems() {
    $(".itemContainer").prepend(cardItems);

}
//let userData = localStorage.getItem("cardData");
//let cardArray = JSON.parse(useData);


/*
function saveitem() {
    switch(e.which) {
        case: 13
            let myval = $("#todoinput").val();
            console.log(myval);
            break;
        default:
        //do nothing
    }
}
*/
