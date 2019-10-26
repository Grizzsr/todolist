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
        this.add = function(itemName,itemComplete) {
            this.collection.push(new item(itemName,itemComplete))
        }
    }
}

class item {
    constructor(itemName,itemComplete) {
        this.itemName = itemName;
        this.itemComplete = itemComplete;
    }
}

let cardArray = new cardStack();