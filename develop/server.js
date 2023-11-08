const path = require('path');
const express = require('express');
const hbs = require('hbs');
const session = require('express-session');
const exphbs = require('express-handlebars');


const routes = require('../controllers/api');
const sequelize = require('./config/connection');


const app = express();
const PORT = process.env.PORT || 3001;

hbs.registerPartials(path.join(__dirname, 'views/partials'), (err) => {console.log(err)});

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});