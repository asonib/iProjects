const express = require('express');
const exphbs  = require('express-handlebars');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const ideas = require('./routes/ideas');

require('./models/Idea');
const Idea = mongoose.model('ideas');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/iproject-dev', {useNewUrlParser: true})
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
  res.render("index", {title : 'iProjects', cap : 'Got Ideas For New Projects.'});
});



app.get('/about', (req, res) => {
  const t = 'Welcome';
  res.render('about', {title : t});
});



app.get('/users/login', (req, res) => {
  res.send('LOGIN');
});

app.get('/users/register', (req, res) => {
  res.send('REGISTER');
});

app.use('/ideas', ideas);

const port = 5000;

app.listen(port, () =>{
  console.log(`Server started on port ${port}`);
});