const assert = require('assert');

let itemsBought = { 'aly': ['3748372637', '4536271829'], 'ksenia': ['574839827'] }

let itemsSold = { 'ksenia': ['29384059454', '38293817283'] } //JSON.parse('./itemsSold')

let items = {
    '29384059454': {
        sellerId: 'ksenia',
        price: 200,
        description: "furray like Bill Murray",
        name: "cat",
        forSale: true //set to false when sold
    },
    '38293817283': {
        sellerId: 'ksenia',
        price: 100,
        description: "also like Bill Murray",
        name: "kitten",
        forSale: true //set to false when sold 
    },
    '3748372637':
        {
            sellerId: 'aly',
            price: 4,
            description: "very cold",
            name: "ice cubes",
            forSale: true //set to false when sold 
        },
    '4536271829':
        {
            sellerId: 'aly',
            price: 90000,
            description: "less cold",
            name: "ice cubes shaped like dolphins",
            forSale: true //set to false when sold  
        },
    '574839827':
        {
            sellerId: 'ksenia',
            price: 90,
            description: "so nice",
            name: "mint",
            forSale: true //set to false when sold 
        }
}


/*
Before implementing the login functionality, use this function to generate a new UID every time.
*/

//item IDs
function genUID() {
    return Math.floor(Math.random() * 100000000)
}
//user id connected to an array of item ids
function putItemsBought(userID, items) {
    itemsBought[userID] = items
    //need to write to itemsBought
}
function putItemsSold(userID, items) {
    itemsSold[userID] = items
}

//shows items that that user has bought
function getItemsBought(userID) {
    return itemsBought[userID];
}


/*
initializeUserIfNeeded adds the UID to our database unless it's already there
parameter: [uid] the UID of the user.
returns: undefined
*/
//if buyer never bought anything assigns empty array
function initializeUserIfNeeded(uid) {
    var items = getItemsBought(uid);
    var itemsSold = allItemsSold(uid)
    if (items == undefined) {
        putItemsBought(uid, []);
    }
    if (itemsSold == undefined) {
        putItemsSold(uid, []);
    }
}

/*
allItemsBought returns the IDs of all the items bought by a buyer
    parameter: [buyerID] The ID of the buyer
    returns: an array of listing IDs
*///seee get getItemsBought
// function allItemsBought(buyerID) {
//     return itemsBought[buyerID];    
// }

/* 
createListing adds a new listing to our global state.
This function is incomplete. You need to complete it.
    parameters: 
      [sellerID] The ID of the seller
      [price] The price of the item
      [blurb] A blurb describing the item
    returns: The ID of the new listing
*/
function createListing({ sellerId, price, description, name }) {
    let itemId = genUID();
    items[itemId] = {
        sellerId: sellerId,
        price: price,
        description: description,
        name: name,
        forSale: true
    }
    return itemId;
    //return item ID
}

/* 
getItemDescription returns the description of a listing
    parameter: [listingID] The ID of the listing
    returns: An object containing the price and blurb properties.
*/
function getItemDescription(itemId) {
    return items[itemId]
}

/* 
buy changes the global state.
Another buyer will not be able to purchase that listing
The listing will no longer appear in search results 
The buyer will see the listing in his history of purchases
The seller will see the listing in his history of items sold
    parameters: 
     [buyerID] The ID of buyer
     [sellerID] The ID of seller
     [listingID] The ID of listing
    returns: undefined
*/
//remove item from items object, move it to itemsSold

//TODO:
function buy(itemID, buyerID) {
    let boughItem = itemID
    items[itemID].forSale = false;
    
}


/* 
allItemsSold returns the IDs of all the items sold by a seller
    parameter: [sellerID] The ID of the seller
    returns: an array of listing IDs
*/
//when not hardcoded, check for items forSale property (false returns the sold items then)
function allItemsSold(sellerID) {
    return itemsSold[sellerID];
}

// allListings returns the IDs of all the listings currently on the market
// Once an item is sold, it will not be returned by allListings
//     returns: an array of listing IDs

//filtering for boolean, returns items not sold as array of Ids
function allItemIds() {
    return Object.keys(items).filter((itemId) => items[itemId].forSale)
}

//returns an array of all items
function allItems() {
    return mapIdsToItems(allItemIds())
}
//go from an array of itm ids to an array of objects
function mapIdsToItems(itemIds) {
    return itemIds.map(itemId => getItemDescription(itemId));
}

function randomHomeItems() {
    let itemsArray = allItems()
    // let itemsArray = Object.values(items);
    let numbersMap = {};
    let randomNumber = Math.floor(Math.random() * itemsArray.length);
    let ret = []
    if(itemsArray.length < 4) return itemsArray;

    for (let i = 0; i < 4; i++) {
        while(numbersMap[randomNumber]) randomNumber = Math.floor(Math.random() * itemsArray.length);
        numbersMap[randomNumber] = true;
        ret.push(itemsArray[randomNumber]);
    }
    return ret;
}

/*
searchForListings returns the IDs of all the listings currently on the market
Once an item is sold, it will not be returned by searchForListings
    parameter: [searchTerm] The search string matching listing descriptions
    returns: an array of listing IDs
*/
//all done on front end
// function searchForListings(searchTerm) {

// }

module.exports = {
    // This is just a shorthand. It's the same as genUID: genUID. 
    initializeUserIfNeeded,
    putItemsBought,
    getItemsBought,
    createListing,
    getItemDescription,
    buy,
    allItemsSold,
    allItemIds,
    allItems,
    mapIdsToItems,
    randomHomeItems
    // Add all the other functions that need to be exported
}
