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

app.get('/shopping/getCart/:email', (req, res) => {
    const email= req.params.email;
    
    console.error('Getting cart for user ' + email);
    const query = datastore.createQuery('shopitem').filter('email', '=', email);
    
    datastore
        .runQuery(query)
        .then(entities => entities[0])
        .then(json => {
            console.log(json);
            getShoppinglist(json ,req, res).then(send => res.status(200).json([{"email":json[0].email}, send]));
        })
        .catch(error => {
            console.log("Error: " + error);
            res.status(500);
        });
    
});
async function getShoppinglist(json , req, res) {
    var items=[];
    for (var i=0; i<json.length; i++){
        var item = await getItem(json[i].productId, req, res).then(res => res.json()).then(json => item=json);
        console.log("item");
        items.push(item[0]);
    }
    console.log(items[0]);
    console.log(items);
    return items;
}
function getItem(productId, req, res) {
        return fetch(req.protocol + '://' + req.host + '/products/getprice/'+productId);
}

app.post('/shopping/add', (req, res) => {
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
        })
        .catch(error => {
            console.log("Error: " + error);
            res.status(500);
        });
    
});

app.post('/shopping/buy/:email', (req, res) => {
    const email=req.params.email;
    console.log("Creating order");
        const query = datastore.createQuery('shopitem').filter('email', '=', email);
    
    datastore
        .runQuery(query)
        .then(entities => entities[0])
        .then(json => {
            console.log(json);
            getShoppinglist(json ,req, res).then(send => createOrder(email, JSON.stringify(send), req, res).then(res => res.json())
                    .then(json => {
                deliverOrder(json.id, req,res);
                res.status(200).send();
            }));
        })
        .catch(error => {
            console.log("Error: " + error);
            res.status(500);
        });
});

function createOrder(email,cart, req, res) {
        console.log("Creating order with shoppingcart: " + email + "items: " + cart);
        return fetch(req.protocol + '://' + req.host + '/delivery/createOrder/', {method:'Post', body: JSON.stringify({"email":email, "items":cart}),
        headers: { 'Content-Type': 'application/json' }});
}
function deliverOrder(orderId, req, res) {
        return fetch(req.protocol + '://' + req.host + '/delivery/deliverOrder/'+orderId, {method:'Post'});
}

const port = process.env.PORT || 2229;
app.listen(port, () => {
    console.log(`Node server listening on port ${port}`);
});
