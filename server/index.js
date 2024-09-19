// ES Module Imports
// import express from 'express';
const SSHDBConnection = require('./database.js');

const dotenv = require('dotenv');
dotenv.config();

const express = require('express');

// Initialize Express server
const app = express();
const port = 3030;

// SSHDBConnection.then((conn) => {
//     conn.query(`SELECT * FROM Customer WHERE id = 6590559`, (err, result, fields) => {
//         if (err) throw err;
//         console.log("SQL Query Result-> ", result);
//         if (result.length !== 0) {  //considering SQL Select statement
//             result = result[0];
//             //perform your required work on result
//         }
//         else {
//             console.log("No data found")
//         }
//     });

// })


app.get("/Customer", async (req, res) => {
    const customers = await getCustomers();
    res.status(200).send("Customers received")
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went horribly wrong");
})

// Test connection
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
