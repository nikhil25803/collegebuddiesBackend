const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Sequelize = require('sequelize-cockroachdb');
const connectionString = process.env.DATABASE_URL

app.use(bodyParser.json())


// Import the Model
const modelDb = require('./models/model');

// Sample data
modelDb.sync({
    force: true,
})
    .then(function () {
        // Insert two rows into the "accounts" table.
        return modelDb.bulkCreate([
            {
                id: 1,
                balance: 1000,
            },
            {
                id: 2,
                balance: 250,
            },
        ]);
    })

// Get List of data
app.get('/list', (re1, res) => {
    modelDb.sync({
        force: false,
    })
        .then(() => {
            return modelDb.findAll();
        })
        .then((model) => {
            res.send(model);
        })
})

// Add
app.post('/add', (req, res) => {
    modelDb.sync({
        force: false,
    })
        .then(() => {
            return modelDb.bulkCreate([
                {
                    id: req.body.id,
                    balance: req.body.balance,
                }
            ])
        })
        .catch((err) => {
            console.log(`Error is ${err}`);
        })
    res.send('People created with Name:' + req.body.balance);
})



app.listen(3000, () => {
    console.log('Server is running');
})