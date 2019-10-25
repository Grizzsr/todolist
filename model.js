class cardStack {
    constructor() {
        this.collection = [];
        this.add = function (cardid, todoTitle) {
            this.collection.push(new todoCards(cardid, todoTitle));
        }
    }
}


class todoCards {
    constructor(cardid, todoTitle) {
        this.cardid = cardid;
        this.todoTitle = todoTitle;
        this.collection = [];
        this.add = function(itemName) {
            this.collection.push(new item(itemName))
        }
    }
}

class item {
    constructor(itemName) {
        this.itemName = itemName;
        this.itemComplete = false;
    }
}

let cardArray = new cardStack();