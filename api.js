const alibay = require('./alibay')
const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const fs = require('fs')

app.use(bodyParser.raw({ type: "*/*" }))

let serverState = {
    accounts: []

}

//Ksenia's added code
let sessionInfo = {}; //store session IDs in the sessionInfo class

let info = {}; //store the accounts here

try {
    info = JSON.parse(fs.readFileSync('../data/info.json').toString());//JSON.parse to turn into a javascript object
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
    fs.writeFileSync('../data/info.json', JSON.stringify(info)); //write to file whenever the file changes
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
        res.send(JSON.stringify({ sessionID, username }));
    }
    else
        res.send(JSON.stringify("failure"));
})

//displays 4 - 5 items on home page
app.get('/home', (req, res) => {

})

//shows items sold by user
app.get('/getItemsSold')
//TODO: integrate this with the items sold
// app.get('/itemsBought', (req, res) => {
//     let uid = req.query.uid;
//     res.send(JSON.stringify(alibay.getItemsBought(uid)));
// });

//get items bought by user
app.get('/getItemsBought')

//show all items to user
app.get('/allItems')

//search all items based on full string
app.post('/search')

//this stores the new item created on the form on the create listing page,
//and displays it to the all listings page
app.post('/newListing')

//adds item to user account history, removes it from listings page
app.get('/buyItem')

app.listen(4000, () => console.log('Listening on port 4000!'))
