const express = require('express');
var bodyParser = require("body-parser");
const fetch = require('node-fetch');

// Imports the Google Cloud client library
const Datastore = require('@google-cloud/datastore');
const datastore = new Datastore();

const app = express();
app.use(bodyParser.json()); // for parsing application/json

app.get('/delivery-service', (req, res) => {
    console.log("Mountpath: " + app.mountpath);
    console.log("BaseUrl: " + req.baseUrl);
    res.status(200).json({ 'message': 'Hello from Node!' });
});

let id = 0;
var arr = [];

// denne gjør egentlig ikke noe. Bruk autogen. fra GCloud.
function incId(){
  return id++;
}


app.post("/delivery/createOrder/", (req, res) => {
  id = ""+incId();
  status = "created";
  shoppingcart = req.body;
  console.log(`createOrder: ${id}, ${status}, ${shoppingcart} `)

  const newOrder = {
    key: datastore.key('delivery'),
    data: {
      id: id,
      status: status,
      shoppingCart: shoppingcart
    },
  };

  datastore.save(newOrder).then(result => {
    console.log(`Saved ${newOrder.key.id}, ${newOrder.data}`);
    console.log(`Returned ID from save: ${result[0]}`);
    res.status(200).json({id: newOrder.key.id});
  }).catch(error => {
    console.log(error);
    res.status(500);
  });
});

app.get("/delivery/getStatus/:orderId", (req, res) => {
  const query = datastore
                .createQuery("delivery")
                .filter("id", "=", req.params.orderId);

  //const query = "SELECT * FROM delivery WHERE id=""+req.params.orderId;
  datastore.runQuery(query)
            .then(results => results[0])
            .then(json => {
              console.log(json)
              res.status(200).json(json);
            })
            .catch(error => {
                res.status(500);
              });

});

app.get("/delivery/getAll/", (req,res) => {
  console.log("Getting all deliveries");

  const query = datastore.createQuery("delivery");

  datastore.runQuery(query).then(entities => entities[0])
        .then(json => {
          console.log(json);
          res.status(200).json(json);
        })
        .catch(error => {
          console.log(error);
          res.status(500);
        });
});

// app.post("/deliverOrder/:orderId",(req,res) => {
//     x = 0
// })


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
