// ES Module Imports
// import express from 'express';
// import { dbcall } from './controller';

// const getCustomers = require('./controller');
const dbConn = require('./database')

const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');

const express = require('express');

// Initialize Express server
const app = express();
app.use(express.json())
app.use(cors())
const port = 3030;

// Gets all Customers
app.get("/Customers", async (req, res) => {
    await dbConn.then((conn) => {
        console.log("Getting Customers")
        conn.query(`SELECT * FROM Customer`, (err, result) => {
            console.log("Entered query")
            if (err) console.log(err);
            console.log("Got Customers");
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
            if (err) console.log(err);
            console.log("Got Customer based on ID");
            res.send(result)
        })
    })
})

// Gets all Employees
app.get("/Employees", async (req, res) => {
    await dbConn.then((conn) => {
        console.log("Getting Employees")
        conn.query(`SELECT * FROM Employee`, (err, result) => {
            if (err) console.log(err);
            console.log("Got Employees");
            res.send(result)
        })
    })
})

// UPDATE `dylanjaipersaud`.`Employee` SET `id` = '0', `first_name` = '0', `last_name` = '0', `phone` = '0', `email` = '0', `role` = '0', `salary` = '0', `team_name` = '0' WHERE (`id` = '9823');
// Updates a single Employee based on ID
app.put("/Employees", async (req, res) => {
    await dbConn.then((conn) => {
        const { id, first_name, last_name, phone, role, team_name } = req.query;
        console.log("Updating Employee ", id)
        console.log("Params: ", req.query)
        conn.query(`UPDATE Employee SET 
            first_name = ?, last_name = ?, phone = ?, role = ?, team_name = ?
            WHERE (id = ?)`,
            [first_name, last_name, phone, role, team_name, id],
            (err, result) => {
                if (err) console.log(err);
                console.log("Updated Employee");
                res.send(result)
            }
        )
    })
})

// Gets a single employee based on ID
app.get("/Employees/:id", async (req, res) => {
    const id = req.params.id
    await dbConn.then((conn) => {
        console.log("Getting Employee with ID = ", id)
        conn.query(`SELECT * FROM Employee WHERE id = ?`, [id], (err, result) => {
            if (err) console.log(err);
            console.log("Got Employee based on ID");
            console.log(result);
            res.send(result)
        })
    })
})

// Gets all teams
app.get("/Teams", async (req, res) => {
    await dbConn.then((conn) => {
        console.log("Getting Teams")
        conn.query(`SELECT * FROM Team`, (err, result) => {
            if (err) console.log(err);
            console.log("Got Teams");
            res.send(result)
        })
    })
})

// Gets all games
app.get("/Games", async (req, res) => {
    await dbConn.then((conn) => {
        console.log("Getting Games")
        conn.query(`SELECT * FROM Application`, (err, result) => {
            if (err) console.log(err);
            console.log("Got Games");
            res.send(result)
        })
    })
})

// Gets all Customers and Employee Logins (id, email)
app.get("/LoginList", async (req, res) => {
    let holdLoginItems = [];
    await dbConn.then((conn) => {
        console.log("Getting Logins")
        conn.query(`SELECT id, email FROM Customer `, (err, result) => {
            if (err) console.log(err);
            holdLoginItems = holdLoginItems.concat(result);
        })
    })
        .catch(err =>
            console.log("An error ocurred", err)
        )

    await dbConn.then((conn) => {
        conn.query(`SELECT id, email FROM Employee `, (err, result) => {
            if (err) console.log(err);
            if (holdLoginItems.length == 0) console.log("Failed to get Customers login")
            else {
                console.log("Got Logins");
                holdLoginItems = holdLoginItems.concat(result);
                res.send(holdLoginItems);
            }
        })
    })
        .catch(err =>
            console.log("An error ocurred", err)
        )
})

// Error handling function
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went horribly wrong");
})

// Test connection
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
