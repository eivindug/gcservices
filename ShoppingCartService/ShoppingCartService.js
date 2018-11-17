const express = require('express');
var bodyParser = require("body-parser");
const fetch = require('node-fetch');

// Imports the Google Cloud client library
const Datastore = require('@google-cloud/datastore');
const datastore = new Datastore();

var itemTable;
var listId=0;

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

app.get('/get/:email'), (req, res) => {
     const email= req.params.email;
     var products;
     
         const query = datastore.createQuery('shopitem').select('productId').filter('email', '=', email);
    
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
}

app.post('/post', (req, res) => {
    const email=req.body.email;
    const productId=req.body.id;
    console.error('posting item ' + productId + ' in shoppinglist for user ' + email);
    
    const newShopItem = {
        key: datastore.key('shopitem'),
        data: {
            email: email,
            productId: productId,
        },
    };

    // Saves the entity
    datastore
        .save(newShopItem)
        .then(() => {
            console.log(`Saved ${newShopItem.key.name}: ${newShopItem.data.email}`);
            res.status(200).send();
            //makeItemToShopperConnection(email, productId, res);
        })
        .catch(error => {
            console.log("Error: " + error);
            res.status(500);
        });
    
});

/*function makeItemToShopperConnection(email, id, res) {
    console.error('Making table with ' + id + ' and email ' + email);
    
    const newShopperItem = {
        key: datastore.key([
                'shopper',
                email,
                'product',
                id,
                'shoppinglist',
                listId,
              ]),
        data: {
        },
    };
    
     datastore
        .save(newShopperItem)
        .then(() => {
            console.log(`Saved ${newShopperItem.key.name}: ${newShopperItem.data.email}`);
            res.status(200).send();
            listId++;
        })
        .catch(error => {
            console.log("Error: " + error);
            res.status(500);
        });   
}*/

const port = process.env.PORT || 2229;
app.listen(port, () => {
    console.log(`Node server listening on port ${port}`);
});
