const assert = require('assert');
const hc = require('./hardCodeItems')


/*
Before implementing the login functionality, use this function to generate a new UID every time.
*/

//item IDs
function genUID() {
    return Math.floor(Math.random() * 100000000)
}
//user id connected to an array of item ids
function putItemsBought(userId, items) {
    hc.itemsBought[userId] = items
    //need to write to itemsBought
}
function putItemsSold(userId, items) {
    hc.itemsSold[userId] = items
}

//shows items that that user has bought
function getItemsBought(userId) {
    return hc.itemsBought[userId];
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
function createListing({ sellerId, price, description, name, imageLocation }) {
    let itemId = genUID();
    hc.items[itemId] = {
        sellerId: sellerId,
        price: price,
        description: description,
        name: name,
        forSale: true,
        itemId: itemId,
        imageLocation: 'http://localhost:4000/images/' + imageLocation

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
    return hc.items[itemId]
}
//trying for a function that returns item description and it's Id
// function getItemDescAndKey(itemId){
//     return items[itemId] + itemId
// }

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
//change forSale boolea
//change the sellerId
//add to itemsBought and itemsSold

function buy(itemId, buyerId) {
    hc.items[itemId].forSale = false;
    hc.itemsBought[buyerId] = hc.itemsBought[buyerId].concat(itemId)
    let sellerId = hc.items[itemId].sellerId;
    hc.itemsSold[sellerId] = hc.itemsSold[sellerId].concat(itemId)
    return { success: true }

}


/* 
allItemsSold returns the IDs of all the items sold by a seller
    parameter: [sellerID] The ID of the seller
    returns: an array of listing IDs
*/
//when not hardcoded, check for items forSale property (false returns the sold items then)
function allItemsSold(sellerID) {
    return hc.itemsSold[sellerID];
}

// allListings returns the IDs of all the listings currently on the market
// Once an item is sold, it will not be returned by allListings
//     returns: an array of listing IDs

//filtering for boolean, returns items not sold as array of Ids
function allItemIds() {
    return Object.keys(hc.items).filter((itemId) => hc.items[itemId].forSale)
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
    let numbersMap = {};
    let randomNumber = Math.floor(Math.random() * itemsArray.length);
    let ret = []
    if (itemsArray.length < 4) return itemsArray;

    for (let i = 0; i < 4; i++) {
        while (numbersMap[randomNumber]) randomNumber = Math.floor(Math.random() * itemsArray.length);
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
