const express = require('express');
const envelopes = require('./envelopes')

const req = require('express/lib/request');
const res = require('express/lib/response');
const app = express();
const port = 3000;

// for output object on console
// instead, will be {} empty
app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is working...');
});

// retrieve all envelopes
app.get('/envelopes', (req, res) => {
    res.json(envelopes);
})

// generate an envelope
app.post('/envelopes', (req, res) => {
    if (!req.body.category) {
        res.status(400);
        res.send("Category is required...")
    }

    const envelope = {
        id: envelopes.length+1,
        category: req.body.category,
        info: req.body.info,
        amount: req.body.amount
    }

    envelopes.push(envelope);
    res.json(envelope);
})


// retrieve a specific envelope
app.get('/envelopes/:id', (req, res) => {
   const id = req.params.id;
   const index = envelopes.findIndex((envelope) => {
       return envelope.id == Number.parseInt(id);
    })
    
    if (index >= 0) {
        const env = envelopes[index];
        res.json(env)
    } else {
        res.status(404);
    }
})

// update a specific envelope
app.put('/envelopes/:id', (req, res) => {
    // here id is the input one in path
    const id = req.params.id;
    console.log(id)
    const category = req.body.category;
    const info = req.body.info;
    const amount = req.body.amount;

    const index = envelopes.findIndex((envelope) => {
        return envelope.id == Number.parseInt(id);
    })

    console.log(index, id)

    if (index >= 0) {
        // id-1 for the 0-based envelope array
        const env = envelopes[index];
        env.category = category;
        env.info = info;
        env.amount = amount;
        res.json(env);
    } else {
        res.status(404).send("You cannot update non-existing envelope...");
        res.end();
    }
})

app.delete('/envelopes/:id', (req, res) => {
    const id = req.params.id;
    const index = envelopes.findIndex((envelope) => {
        return envelope.id == Number.parseInt(id);
    })

    if (index >= 0) {
        const env = envelopes[index];
        envelopes.splice(index,1);
        res.json(env)
    } else {
        res.status(404);
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});
