"use strict"

const express = require("express");
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express()

app.set('port',(process.env.PORT || 3000 ));
app.get('/test',(req,res) => {
    res.setHeader('Cache-Control','no-cache');
    res.json({'hello':'world'});
})

app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
  });