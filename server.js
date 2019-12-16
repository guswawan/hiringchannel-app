require ('dotenv/config');
const express = require ('express');
const logger = require ('morgan');
const cors = require ('cors');
const helmet = require ('helmet');
const bodyParser = require ('body-parser');

const router = require ('./src/Routes/index');

const app = express ();
const PORT = 5000;

app.use ('/', router); // localhost:5000/

app.use (logger ('dev'));
app.use (helmet.xssFilter ()); //cross server scripting
app.use (cors ()); //manage cors, menentukan situs mana yang boleh akses, situs yang mana yang di blacklist
app.use (bodyParser.json ());
app.use (bodyParser.urlencoded ({extended: false}));


app.listen (PORT, () => {
  console.log (`Server is Running on port ${PORT}`);
});


module.exports = app;