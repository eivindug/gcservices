const express = require('express');
var bodyParser = require("body-parser");
const fetch = require('node-fetch');

// Imports the Google Cloud client library
const Datastore = require('@google-cloud/datastore');
const datastore = new Datastore();

var itemTable;

const app = express();
app.use(bodyParser.json()); // for parsing application/json

app.get('/shopping-cart-service', (req, res) => {
    console.log("Mountpath: " + app.mountpath);
    console.log("BaseUrl: " + req.baseUrl);
    
    fetch(req.protocol + '://' + req.host + '/products/get')
        .then(res => res.json())
        .then(json => {
            console.log(json);
            itemTable=JSON.parse(json);
        })
        .catch(error => console.log(error));
    
    res.status(200).json({ 'message': 'Hello from ShoppingCartService!' });
});

app.post('/post', (req, res) => {
    const email=req.body.email;
    const productId=req.body.id;
    console.error('posting item ' + productId + ' in shoppinglist for user ' + email);
    
    const name=itemTable[productId-1];
    var price;
    
    fetch(req.protocol + '://' + req.host + '/products/getprice/'+productId)
        .then(res => res.json())
        .then(json => {
            console.log(json);
            price=json;
        })
        .catch(error => console.log(error));
   
   
});

const port = process.env.PORT || 2229;
app.listen(port, () => {
    console.log(`Node server listening on port ${port}`);
});
