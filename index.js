const express = require('express');
const envelopes = require('./envelopes')

const req = require('express/lib/request');
const res = require('express/lib/response');
const app = express();
// https://localhost:3000/ as url
const port = 3000;

// for output object on console
// instead, will be {} empty
app.use(express.json())

// test the base api working or not
app.get('/', (req, res) => {
    res.send('API is working...');
});

// create an envelope
app.post('/envelopes', (req, res) => {
    if (!req.body.category) {
        res.status(400);
        res.send("Category is required...")
    }

    const envelope = {
        // all the "id" in this file represents the id char of object
        // which is 1-based, matches the objects in envelopes.js
        id: envelopes[envelopes.length-1].id+1,
        category: req.body.category,
        info: req.body.info,
        amount: req.body.amount
    }

    envelopes.push(envelope);
    res.json(envelope);
})

// retrieve all envelopes
app.get('/envelopes', (req, res) => {
    res.json(envelopes);
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
        res.send("The id is not existing....");
    }

})

// update a specific envelope
app.put('/envelopes/:id', (req, res) => {
    // here id is the input one in path
    const id = req.params.id;
    console.log(id)

    const index = envelopes.findIndex((envelope) => {
        return envelope.id == Number.parseInt(id);
    })

    if (index >= 0) {
        const category = req.body.category;
        const info = req.body.info;
        const amount = req.body.amount;

        const env = envelopes[index];
        env.category = category;
        env.info = info;
        env.amount = amount;
        res.json(env);
    } else {
        res.status(404);
        res.send("You cannot update non-existing envelope....");
    }

})

// delete a specific envelope
app.delete('/envelopes/:id', (req, res) => {
    // here id is string intead of integer
    const id = req.params.id;

    const index = envelopes.findIndex((envelope) => {
        return envelope.id == Number.parseInt(id);
    })

    if (index >= 0) {
        const env = envelopes[index];
        envelopes.splice(index,1);
        res.json(env);
    } else {
        res.status(404);
        res.send("You cannot delete non-existing envelope....");
    }

})

// transfer budgets from different envelopes
app.post('/envelopes/transfer/:from/:to', (req, res) => {
    const from = req.params.from;
    const to = req.params.to;
    console.log('two ids are', from, to)

    const index1 = envelopes.findIndex((envelope) => {
        return envelope.id == Number.parseInt(from);
    })

    const index2 = envelopes.findIndex((envelope) => {
        return envelope.id == Number.parseInt(to);
    })

    if (index1 >= 0 && index2 >= 0) {
        const env1 = envelopes[index1];
        const env2 = envelopes[index2];
        console.log("before change", env1.amount, env2.amount);

        const holdAmount = env2.amount;
        env2.amount = env1.amount;
        env1.amount = holdAmount;
        console.log("after change", env1.amount, env2.amount);

        return res.send("Already changed!");
    } else {
        res.status(404);
        res.send("Please check the ids you input...");
    }

}) 


app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});
