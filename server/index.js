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
// { "id": 7462, "first_name": "Tyler", "last_name": "David", "phone": "5658936433", 
// "email": "tylerd11@poge.com", "role": "Graphic Designer", "salary": 107000, "team_name": "Snowstorm" } 
app.put("/Customers", async (req, res) => {
    await dbConn.then((conn) => {
        const { id, first_name, last_name, account_name } = req.query;
        console.log("Updating Customer ", id)
        console.log("Params: ", req.query)
        conn.query(`UPDATE Customer SET 
            first_name = ?, last_name = ?, account_name = ?
            WHERE (id = ?)`,
            [first_name, last_name, account_name, id],
            (err, result) => {
                if (err) console.log(err);
                console.log("Updated Customer");
                res.send(result)
            }
        )
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

// Gets a single game
app.put("/Games", async (req, res) => {
    // const game = req.params.game
    const { game, release_date } = req.query;
    await dbConn.then((conn) => {
        console.log("Getting Game where game = ", game)
        conn.query(`UPDATE Application SET release_date = ? WHERE game = ?`, [release_date, game], (err, result) => {
            if (err) console.log(err);
            console.log("Got Games");
            res.send(result)
        })
    })
})

// Updates a game's release date
app.get("/Games/:game", async (req, res) => {
    const game = req.params.game
    await dbConn.then((conn) => {
        console.log("Updating Game where game = ", game)
        conn.query(`SELECT * FROM Application WHERE game = ?`, [game], (err, result) => {
            if (err) console.log(err);
            console.log("Updated Game");
            res.send(result)
        })
    })
})

// Gets all Platforms for Applications
app.get("/PlatformApps", async (req, res) => {
    await dbConn.then((conn) => {
        console.log("Getting Games")
        conn.query(`SELECT * FROM PlatformApp`, (err, result) => {
            if (err) console.log(err);
            console.log("Got Games");
            res.send(result)
        })
    })
})

// Gets all Platforms for a game
app.get("/PlatformApps/:game", async (req, res) => {
    const game = req.params.game
    await dbConn.then((conn) => {
        console.log("Getting Platforms where game = ", game)
        conn.query(`SELECT * FROM PlatformApp WHERE game = ?`, [game], (err, result) => {
            if (err) console.log(err);
            console.log("Got Platforms where game = ", game);
            res.send(result)
        })
    })
})

// Gets all game updates
app.get("/Updates", async (req, res) => {
    await dbConn.then((conn) => {
        console.log("Getting Updates")
        conn.query(`SELECT * FROM Updates`, (err, result) => {
            if (err) console.log(err);
            console.log("Got Updates");
            res.send(result)
        })
    })
})

//Post a single update
app.post("/Updates", async (req, res) => {
    const { patch, game, team_name, reason, status } = req.query
    const release_date = "2008-11-11 13:23:44"
    const storage = "1GB"

    // Posting to Content due to FK
    await dbConn.then((conn) => {
        console.log("Posting Content")
        conn.query(`INSERT INTO Content
            (patch, game, release_date, storage)
            VALUES (?, ?, ?, ?)`,
            [patch, game, release_date, storage], (err, result) => {
                if (err) console.log(err);
                console.log("Posted Content");

            })
    })
        .catch(err =>
            console.log("An error ocurred", err)
        )

    await dbConn.then((conn) => {
        console.log("Posting Updates where data = ", req.query)
        conn.query(`INSERT INTO Updates
            (patch, game, team_name, reason, status)
            VALUES (?, ?, ?, ?, ?)`,
            [patch, game, team_name, reason, status], (err, result) => {
                if (err) console.log(err);
                console.log("Posted Updates");
                res.send(result)
            })
    })
        .catch(err =>
            console.log("An error ocurred", err)
        )
})

// Gets all customer purchases
app.get("/Purchases", async (req, res) => {
    await dbConn.then((conn) => {
        console.log("Getting Purchases")
        conn.query(`SELECT * FROM Purchase`, (err, result) => {
            if (err) console.log(err);
            console.log("Got Purchases");
            res.send(result)
        })
    })
})

// Gets a single customer's purchases
app.get("/Purchases/:account", async (req, res) => {
    const account_name = req.params.account
    await dbConn.then((conn) => {
        console.log("Getting Purchases where account =", account_name)
        conn.query(`SELECT * FROM Purchase WHERE account = ?`, [account_name], (err, result) => {
            if (err) console.log(err);
            console.log("Got Purchases");
            res.send(result)
        })
    })
})

// {
//     "invoice": 158873,
//     "account": "sandyaid",
//     "store": "Steam Deck",
//     "game": "Dims4",
//     "date": "2005-11-18T14:10:00.000Z",
//     "payment_method": "Gift Card",
//     "type": "Purchase"
//   },

// Post a purchase
app.post("/Purchases", async (req, res) => {
    const invoice = Math.floor(Math.random() * (999999 - 111111) + 111111);
    console.log("Invoice: ", invoice);
    // console.log(req);
    const { account, store, game, date, payment_method, type } = req.query
    await dbConn.then((conn) => {
        console.log("Posting Purchases where details =", req.query)
        conn.query(`INSERT INTO Purchase 
            (invoice, account, store, game, date, payment_method, type) 
            VALUES 
            (?, ?, ?, ?, ?, ?, ?)`,
            [invoice, account, store, game, date, payment_method, type], (err, result) => {
                if (err) console.log(err);
                else console.log("Posted Purchase", result);
                res.send(result)
            })
    })
})

// Gets all Forum entries
app.get("/Forums", async (req, res) => {
    await dbConn.then((conn) => {
        console.log("Getting Forums")
        conn.query(`SELECT * FROM Forum`, (err, result) => {
            if (err) console.log(err);
            console.log("Got Forums");
            res.send(result)
        })
    })
})

// Post a forum post
app.post("/Forums", async (req, res) => {
    // console.log(req);
    const { game, account, date, reason, description } = req.query
    await dbConn.then((conn) => {
        console.log("Posting Forum where details =", req.query)
        conn.query(`INSERT INTO Forum 
            (game, account, date, reason, description) 
            VALUES 
            (?, ?, ?, ?, ?)`,
            [game, account, date, reason, description], (err, result) => {
                if (err) console.log(err);
                else console.log("Posted Forum", result);
                res.send(result)
            })
    })
})

// Deletes a single post from Forums
app.delete("/Forums", async (req, res) => {
    console.log(req);
    const { game, account, description } = req.body
    await dbConn.then((conn) => {
        console.log("Deleting Forum where details =", req.body)
        conn.query(`DELETE FROM Forum 
            WHERE game = ? AND account = ? AND description = ?`,
            [game, account, description], (err, result) => {
                if (err) console.log(err);
                else console.log("Deleted Forum", result);
                res.send(result)
            })
    })
})

// Gets all from Development
app.get("/Developments", async (req, res) => {
    await dbConn.then((conn) => {
        console.log("Getting Development")
        conn.query(`SELECT * FROM Development`, (err, result) => {
            if (err) console.log(err);
            console.log("Got Development");
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
