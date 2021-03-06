const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

const ideas = require('./routes/ideas');

require('./models/Idea');
const Idea = mongoose.model('ideas');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
.then(() => {
  console.log('MongoDB Connected');
}).catch(err => {
  console.log(err);
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(methodOverride('_method'));


//Express Handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render("index", {title : 'Idea Storage System', cap : 'Got Ideas For New Projects.'});
});



app.get('/about', (req, res) => {
  const t = 'Welcome';
  res.render('about', {title : t});
});



app.get('/users/login', (req, res) => {
  res.send('Authentication to be implemented');
});

app.get('/users/register', (req, res) => {
  res.send('Authentication to be implemented');
});

app.use('/ideas', ideas);

const port = process.env.PORT;

app.listen(port, () =>{
  console.log(`Server started on port ${port}`);
});