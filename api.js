const alibay = require('./alibay')
const express = require('express')
const app = express()
//Aly is awesome at backend!
const bodyParser = require('body-parser')
const fs = require('fs')

app.use(express.static('public'))

app.use(bodyParser.raw({ type: '*/*', limit: '50mb' }))

<<<<<<< HEAD
//let sessionsMap = []; // array to store in the sessionIDs to check for cookies
=======
let sessionsMap = []; // arra to store in the sessionIDs
>>>>>>> 9189e6a38ebd291bdd2c66285256e7854c76d357

let sessionInfo = {}; //store session IDs in the sessionInfo class

let info = JSON.parse(fs.readFileSync('data/info.json'))

try {
    info = JSON.parse(fs.readFileSync('data/info.json').toString());//JSON.parse to turn into a javascript object
} catch (err) {
}

// this runs first, fist page to user sees to choose user name and password
app.post('/createAccount', (req, res) => {
    let parsed = JSON.parse(req.body.toString());
    let username = parsed.username.toLowerCase(); //taking case of any uppercase
    let password = parsed.password.toLowerCase(); //taking case of any uppercase

    if (info[username]) {
        return res.send(JSON.stringify('account already exists'));
    }
    let sessionID = Math.floor(Math.random() * 10000000);
    sessionInfo[sessionID] = username;
    info[username] = password; //additing username and password to the associative map and storing it
    alibay.initializeUserIfNeeded(username)
    fs.writeFileSync('data/info.json', JSON.stringify(info)); //write to file whenever the file changes
    res.send(JSON.stringify({ username, password, sessionID }));
})

//checks if username and password match and are valid
app.post('/login', (req, res) => {
    let body = req.body.toString()
    let parsed = JSON.parse(body)
    let username = parsed.username.toLowerCase();  //taking case of any uppercase
    let password = parsed.password.toLowerCase(); //taking case of any uppercase
    let sessionID = Math.floor(Math.random() * 10000000); //generate session ID only at login
    if (info[username] === password) { //checks whether the password for the user matches the entered password
        sessionInfo[sessionID] = username;
<<<<<<< HEAD
        alibay.initializeUserIfNeeded(username)
        // sessionsMap[sessionID] = username; adding cookies to sessionsMap against the sessionId
        // console.log(req.headers.cookie)
        // if (req.headers.cookie === "") {
        //     res.set('Set-Cookie', sessionID); //sending session ID using cookies
        // }
        res.send(JSON.stringify({ sessionID, username }));
=======
        alibay.initializeUserIfNeeded(username);
        sessionsMap[sessionID] = username;
        console.log(req.headers.cookie)
        if (req.headers.cookie === "") {
            res.set('Set-Cookie', sessionID); //sending session ID using cookies
        }
        res.send(JSON.stringify({ sessionID, username })); //do we need to send the sessionID if using cookies
>>>>>>> 9189e6a38ebd291bdd2c66285256e7854c76d357
    }
    else {
        res.send(JSON.stringify("failure"));
    }
})

<<<<<<< HEAD
//Aly knows the code!
// app.get("/checkLoginCookieMethod", (req, res) => {
//     console.log("ASD")
//     if (req.headers.cookie) {
//         let sessionID = req.headers.cookie;
//         // you need to create the session map file as an object with session id and put it whenever a user logs in
//         // sessionsMap = [413413125132,131412314312,1331313414]
//         if (sessionsMap[sessionID] !== undefined) {
//             //res success and user information that is normaly sent after login  
//             res.send(JSON.stringify({ sessionID, username: sessionsMap[sessionID] }));
//         }
//         res.send(JSON.stringify({ status: "notLogged" }))
//     }
//     res.send(JSON.stringify({ status: "notLogged" })) //check for this condition 
// })
=======
app.get("/checkLoginCookieMethod", (req, res) => {
    console.log("ASD")
    if (req.headers.cookie) {
        let sessionID = req.headers.cookie;
        // you need to create the session map file as an object with session id and put it whenever a user logs in
        // sessionsMap = [413413125132,131412314312,1331313414]
        if (sessionsMap[sessionID] !== undefined) {
            //res success and user information that is normaly sent after login  
            res.send(JSON.stringify({ sessionID, username: sessionsMap[sessionID] }));
        }
        res.send(JSON.stringify({ status: "notLogged" }))
    }
    res.send(JSON.stringify({ status: "notLogged" })) //check for this condition 
})

>>>>>>> 9189e6a38ebd291bdd2c66285256e7854c76d357

app.get('/getItemDetails', (req, res) => {
    let itemId = req.query.itemId
    let itemDetails = alibay.getItemDescription(itemId)
    res.send(JSON.stringify(itemDetails))
})

//displays 6 items on home page
app.get('/home', (req, res) => {
    let randomItems = alibay.randomHomeItems()
    res.send(JSON.stringify(randomItems))
})

//shows items sold by user
app.get('/getItemsSold', (req, res) => {
    let userId = req.query.userId
    let itemsSoldIds = alibay.allItemsSold(userId);
    res.send(JSON.stringify(alibay.mapIdsToItems(itemsSoldIds)))
})


//get items bought by user
app.get('/getItemsBought', (req, res) => {
    let userId = req.query.userId
    let itemsBoughtIds = alibay.getItemsBought(userId)
    res.send(JSON.stringify(alibay.mapIdsToItems(itemsBoughtIds)))
})

//show all items to user
app.get('/allItems', (req, res) => {
    res.send(JSON.stringify(alibay.allItems()))
})


//this stores the new item created on the form on the create listing page,
//and displays it to the all listings pagels
//added fs.writeFileSync
app.post('/newListing', (req, res) => {
    let parsed = JSON.parse(req.body.toString());
    if (parsed !== undefined) {
        let itemId = alibay.createListing(parsed)
        if (itemId === null) {
            res.send({ "success": false, "reason": "not all parameters were met" })
        } else {
            res.send(JSON.stringify(itemId));
        }
    } else {
        res.send({ "success": false, "reason": "undefined" })
    }
})

//adds item to user account history, removes it from listings page
app.get('/buyItem', (req, res) => {
    let itemId = req.query.itemId
    let buyerId = req.query.userId

    let buyIt = alibay.buy(itemId, buyerId)
    res.send(JSON.stringify(buyIt))
})

app.post('/uploadPics', (req, res) => {
    let extension = req.query.ext
    let randomString = '' + Math.floor(Math.random() * 10000000)
    let randomFilename = randomString + '.' + extension
    fs.writeFileSync('public/images/' + randomFilename, req.body);
    res.send(JSON.stringify(randomFilename))

})

app.listen(4000, () => console.log('Listening on port 4000!'))

