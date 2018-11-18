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

let id = 0;
var arr = [];

function incId(){
  return id++;
}


app.post("/createOrder", (req, res) => {
  id = incId();
  status = "created";
  shoppingcart = req.body;

  const newOrder = {
    key: datastore.key("delivery"),
    data:{
      "id": id,
      "status": status,
      "shoppingcart": shopping
    },
  };

  datastore.save(newOrder).then(() => {
    console.log(`Saved ${newOrder.key.name}, ${newOrder.data.status}`);
    res.status(200).send();
  }).catch(error => {
    console.log(error);
    res.send(500);
  })


  res.status(200);
})

app.get("/getStatus/:orderId", (req, res) => {

})

app.post("/deliverOrder/:orderId",(req,res) => {

})


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




function sendMail() {
    console.log("Sending mail 10 seconds after endpoint returned response");
}

app.post('/delivery', (req, res) => {
    setTimeout(sendMail, 10000);

    console.log("Sending response immediately");
    res.status(200).json({status: "OK"});
});

const port = process.env.PORT || 2230;
app.listen(port, () => {
    console.log(`Node server listening on port ${port}`);
});
