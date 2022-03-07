var Ddos = require('ddos')
const express = require('express');
const helmet = require("helmet");
var ddos = new Ddos({burst:10, limit:15})
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');
const path = require('path');

mongoose.connect(process.env.MONGO_URL,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();
app.use(ddos.express);

//making images' folder static
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(helmet());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());
app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes)

module.exports = app;