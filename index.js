const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const app = express();
const port = 3000;

app.use(express.json())

// initial envelopes
const envelopes = [
    {
        "id": 0,
        "url": "/total",
        "info": "envelope for total budget",
        "amount": 5000
    },
    {
        "id": 1,
        "url": "/groceries",
        "info": "envelope for groceries budget",
        "amount": 500
    },
    {
        "id": 2,
        "url": "/gas",
        "info": "envelope for gas budget",
        "amount": 500
    },
    {
        "id": 3,
        "url": "/health",
        "info": "envelope for health budget",
        "amount": 500
    },
    {
        "id": 4,
        "url": "/clothing",
        "info": "envelope for clothing budget",
        "amount": 500
    },
    {
        "id": 5,
        "url": "/dining_out",
        "info": "envelope for dining_out budget",
        "amount": 500
    },
    {
        "id": 6,
        "url": "/household_items",
        "info": "envelope for household_items budget",
        "amount": 500
    },
    {
        "id": 7,
        "url": "/pet_care",
        "info": "envelope for pet_care budget",
        "amount": 500
    },
    {
        "id": 8,
        "url": "/irregular_expense",
        "info": "envelope for irregular_expense budget",
        "amount": 500
    },
]

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/envelopes', (req, res, next) => {
    res.send(envelopes);
})

app.get('/envelopes/:id', (req, res, next) => {
    // object’s keys are any parameter names in the route
    // each key’s value is the actual value of that field per request
    console.log(req.params);
    const envelopeInvertory = envelopes[req.params.id];
    if (envelopeInvertory) {
        res.send(envelopeInvertory);
      } else {
        res.status(404).send('Envelope not found');
      }
})

app.post('/envelopes', (req, res, next) => {
    console.log(req.body);
    const receivedEnvelope = req.body;
    if (receivedEnvelope){
        envelopes.push(receivedEnvelope);
        res.status(201).send(receivedEnvelope);
    } else {
        res.status(400).send();
    }

})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});
