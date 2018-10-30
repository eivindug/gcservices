const express = require('express');
var bodyParser = require("body-parser");
const fetch = require('node-fetch');

// Imports the Google Cloud client library
const Datastore = require('@google-cloud/datastore');
const datastore = new Datastore();

const app = express();
app.use(bodyParser.json()); // for parsing application/json

app.get('/node-service', (req, res) => {
    console.log("Mountpath: " + app.mountpath);
    console.log("BaseUrl: " + req.baseUrl);
    res.status(200).json({ 'message': 'Hello from Node!' });
});

app.get('/forward-to-python', (req, res) => {
    // node-fetch må ha absolutt URL
    fetch(req.protocol + '://' + req.host + '/python-service')
        .then(res => res.json())
        .then(json => {
            console.log(json);
            res.json(json);
        })
        .catch(error => console.log(error))
});

app.get('/message', (req, res) => {
    console.error('Getting all messages');

    const query = datastore.createQuery('message');

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
})

app.post('/message', (req, res) => {
    console.log('New message: ' + req.body.message);

    // Prepares the new entity
    const newMessage = {
        key: datastore.key('message'),
        data: {
            message: req.body.message,
        },
    };

    // Saves the entity
    datastore
        .save(newMessage)
        .then(() => {
            console.log(`Saved ${newMessage.key.name}: ${newMessage.data.message}`);
            res.status(200).send();
        })
        .catch(error => {
            console.log("Error: " + error);
            res.status(500);
        });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Node server listening on port ${port}`);
});
