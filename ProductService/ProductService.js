const express = require('express');
var bodyParser = require("body-parser");
const fetch = require('node-fetch');

// Imports the Google Cloud client library
const Datastore = require('@google-cloud/datastore');
const datastore = new Datastore();

const app = express();
app.use(bodyParser.json()); // for parsing application/json

app.get('/product-service', (req, res) => {
    console.log("Mountpath: " + app.mountpath);
    console.log("BaseUrl: " + req.baseUrl);
    res.status(200).json({ 'message': 'Hello from ProductService' });
});

app.get('/products/get', (req, res) =>{
    console.error('Getting all products');

    const query = datastore.createQuery('product');

    datastore
        .runQuery(query)
        .then(entities => entities[0])
        .then(json => {
            console.log(json);
            res.status(200).json(json);
        })
        .catch(error => {
            console.log("Error: " + error);
            res.status(500);
        });
});

app.get('/products/getprice/:productId', (req, res) =>{
    console.error('Getting price');
    const id= req.params.productId;
    console.error('Getting price for item' + id);
    
    const query = datastore.createQuery('product').filter('__key__', '=', 
        datastore.key(['product', id]));
    
    datastore
        .runQuery(query)
        .then(entities => entities[0])
        .then(json => {
            console.log(json);
            res.status(200).json(json);
        })
        .catch(error => {
            console.log("Error: " + error);
            res.status(500);
        });
    
});

const port = process.env.PORT || 2228;
app.listen(port, () => {
    console.log(`Node server listening on port ${port}`);
});
