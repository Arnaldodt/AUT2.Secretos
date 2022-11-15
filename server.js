const express = require("express");
const BBDD = require("./server/config/mongoose");
const session = require('express-session');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({secret:'codigosecreto'}));

app.set('view engine','ejs');
app.set('views',__dirname + '/client/views');
app.use("/recursos", express.static(__dirname + '/client'));

const routers = require("./server/config/routers");
app.use(routers);

const puerto = require('./server/config/puerto.js')(app);