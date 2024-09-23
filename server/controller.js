const dbConnection = require('./database.js');

async function getCustomers() {

    await dbConnection.then(async (conn) => {
        console.log("Getting Customers")
        conn.query(`SELECT * FROM Customer WHERE id = 6590559`, (err, result) => {
            console.log("Entered query")
            if (err) throw err;
            // console.log("SQL Query Result-> ", result);
            return (result)

            // res.send(result)
            // if (result.length !== 0) {  //considering SQL Select statement
            //     result = result[0];
            //     //perform your required work on result
            // }
            // else {
            //     console.log("No data found")
            // }

        })
    })

}

module.exports = getCustomers;