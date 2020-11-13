const express = require('express');
const fs = require("fs")
const path = require("path")
const app = express();

//setup view engine
app.set('view engine' , 'ejs');
app.use('/assets',express.static(path.join(__dirname + 'css')))
// create home route
app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3000, () => {
    console.log("Listening on port: 3000");
});