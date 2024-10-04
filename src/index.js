// import express framework
const express = require('express');
const config = require('./server/config.js');
const app = config(express());

// call to connect to database
require('./server/database.js');

// start server on configured port
app.listen(app.get('port'), ()=> {
    console.log('server start');
});

// export app instance
module.exports = app;