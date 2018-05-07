const alibay = require('./alibay')
const express = require('express')
const app = express()

let serverState = {
    accounts : []
    
}

// this runs first, fist page to user sees to choose user name and password
app.post('/createAccount', (req, res) => {
//TODO:
})

//checks if username and password match and are valid
app.post('/login', (req, res) => {
    let body = req.body.toString()
    let parsed = JSON.parse(body)
    let usr = parsed.username;
    let pwd = parsed.password;

//TODO:
})

//displays 4 - 5 items on home page
app.get('/home', (req, res) => {

})

//shows items bought and sold by user
app.get('/userActivity')
//TODO: integrate this with the items sold
// app.get('/itemsBought', (req, res) => {
//     let uid = req.query.uid;
//     res.send(JSON.stringify(alibay.getItemsBought(uid)));
// });

//show all items to user
app.get('/allItems')

//search all items based on full string
app.post('/search')

//this stores the new item created on the form on the create listing page,
//and displays it to the all listings page
app.post('/newListing')

//adds item to user account history, removes it from listings page
app.get('/buyItem')

app.listen(3000, () => console.log('Listening on port 3000!'))
