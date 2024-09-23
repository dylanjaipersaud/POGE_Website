// ES Module Imports
// import express from 'express';
// import { dbcall } from './controller';

// const getCustomers = require('./controller');
const dbConn = require('./database')

const dotenv = require('dotenv');
dotenv.config();

const express = require('express');

// Initialize Express server
const app = express();
const port = 3030;

// Gets all Customers
app.get("/Customers", async (req, res) => {
    await dbConn.then((conn) => {
        console.log("Getting Customers")
        conn.query(`SELECT * FROM Customer`, (err, result) => {
            console.log("Entered query")
            if (err) console.log(err);
            console.log("SQL Query Result-> ", result);
            res.send(result)
        })
    })
})

// Gets a single customer based on their ID
app.get("/Customers/:id", async (req, res) => {
    const id = req.params.id
    await dbConn.then((conn) => {
        console.log("Getting Customers")
        conn.query(`SELECT * FROM Customer WHERE id = ?`, [id], (err, result) => {
            console.log("Entered query")
            if (err) console.log(err);
            console.log("SQL Query Result-> ", result);
            res.send(result)
        })
    })
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went horribly wrong");
})

// Test connection
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
