// require express
const express = require("express"); 
// init express
const app = express(); 
// require router
const router = express.Router(); 
// require body parser for processing json
const bodyparser = require('body-parser'); 
app.use(bodyparser.json());

// require router file
const _router = require('./router/index.router')(router); 

app.use("/", _router, (req, res) => {
    res.sendStatus(401)
});

// set port
const port = process.env.PORT || 5000;

// start service
app.listen(port, () => console.log(`server started on port ${port}`));