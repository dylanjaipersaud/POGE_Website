// ES Module Imports
// import express from 'express';
// import mysql from 'mysql2';
// import dotenv from 'dotenv';

const dotenv = require('dotenv');
dotenv.config();

// const express = require('express');

const mysql = require('mysql2');

const { Client } = require('ssh2');
const sshClient = new Client();
let holdConn;

// Database connection details
const dbServer = {
    host: process.env.MYSQL_HOST,
    port: 3306,
    user: process.env.MYSQL_USER,
    // PASSWORD MAY BE BLANK (empty string / '')
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
};

// SSH user details
const sshTunnelConfig = {
    host: process.env.SSH_HOST,
    port: 22,
    username: process.env.SSH_USERNAME,
    password: process.env.SSH_PASSWORD,
};

// SSH connection details
const forwardConfig = {
    srcHost: 'localhost',
    srcPort: 3367,
    dstHost: dbServer.host,
    dstPort: dbServer.port,
};

// Starting the SSH connection
const SSHDBConnection = new Promise((resolve, reject) => {
    sshClient.on('ready', () => {
        sshClient.forwardOut(
            forwardConfig.srcHost,
            forwardConfig.srcPort,
            forwardConfig.dstHost,
            forwardConfig.dstPort,
            (err, stream) => {
                if (err) reject(err);
                const updatedDBServer = {
                    ...dbServer,
                    stream
                };
                console.log("Attempting to connect to db...");
                const connection = mysql.createPool(updatedDBServer);
                connection.getConnection((error) => {
                    if (error) {
                        console.log("Error: ", error);
                        reject(error);
                    }
                    console.log("Connection Successful");
                    try {
                        resolve(connection);
                    } catch (err) {
                        console.log(err);
                    }
                });
            }
        );
    }).connect(sshTunnelConfig);
})
    .then((conn) => {
        holdConn = (conn.config.connectionConfig.user);
        console.log("User: ", holdConn);
    });
console.log("User: ", holdConn);
    // holdConn.query(`SELECT * FROM Customer WHERE id = 6590559`, (err, result, fields) => {
    //     if (err) throw err;
    //     console.log("SQL Query Result-> ", result);
    //     if (result.length !== 0) {  //considering SQL Select statement
    //         result = result[0];
    //         //perform your required work on result
    //     }
    //     else {
    //         console.log("No data found")
    //     }

    // });

async function getCustomers(id){
    const [rows] = await SSHDBConnection.query(`SELECT * FROM Customer`)
    return rows[0];
}

// getCustomers();

module.exports = SSHDBConnection;

// async function getCustomers(){
//     const [rows] = await connection.query(
//         `SELECT * FROM Customer`
//     )
//     return rows[0];
// }

// getCustomers();

// myDBConnectionClient.then((conn) => {
//     conn.query(`SQL_QUERY_STATEMENT`, (err, result, fields) => {
//         if (err) throw err;
//         console.log("SQL Query Result-- ", result);
//         if (result.length !== 0) {  //considering SQL Select statement
//             result = result[0];
//             //perform your required work on result
//         }

//     });
// })

// Connection to MySQL database
// const pool = mysql.createPool({
//     connectionLimit: 10,
//     host: process.env.MYSQL_HOST,
//     localAddress: '127.0.0.1',
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE
// });

// const conn = pool.getConnection();

// app.get('/Customer', (res) => {
//     hold = conn.query('SELECT * FROM Customer', (err, rows) => {
//       if (err) throw err;
//       res.json(rows);
//     });
//   });

//  const result = conn.query("SELECT * FROM Customer");

