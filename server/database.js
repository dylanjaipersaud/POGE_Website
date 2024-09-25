// ES Module Imports
// import express from 'express';
// import mysql from 'mysql2';
// import dotenv from 'dotenv';

const dotenv = require('dotenv');
dotenv.config();

const mysql = require('mysql2');

const { Client } = require('ssh2');
const sshClient = new Client();

// Database connection details
const dbServer = {
    host: process.env.MYSQL_HOST,
    port: 3306,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD, // PASSWORD MAY BE BLANK (empty string / '')
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
                // Connection to MySQL database
                console.log("User ", dbServer.user,"is attempting to connect to db...");
                const connection = mysql.createConnection(updatedDBServer);
                connection.connect((error) => {
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
});


module.exports = SSHDBConnection;

