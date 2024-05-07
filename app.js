import express from 'express';
import morgan from 'morgan';
import nunjucks from 'nunjucks';
import sample from 'lodash.sample' // import sample from 'lodash.sample'

const app = express();
const port = '8000';

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

// Run the server.
const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${server.address().port}...`);
});

const COMPLIMENTS = [
  'awesome',
  'terrific',
  'fantastic',
  'neato',
  'fantabulous',
  'wowza',
  'oh-so-not-meh',
  'brilliant',
  'ducky',
  'coolio',
  'incredible',
  'wonderful',
  'smashing',
  'lovely',
];

// Display the homepage
app.get('/', (req, res) => {
  res.render('index.html');
});

// Display a form that asks for the user's name.
app.get('/hello', (req, res) => {
  res.render('hello.html');
});

// Handle the form from /hello and greet the user.
app.get('/greet', (req, res) => {
  const name = req.query.name || 'stranger';
  const compliment = sample(COMPLIMENTS) // 'compliment' variable with the value of sample(COMPLIMENTS)
  res.render('greet.html', { 
    name: name,
    compliment : compliment // add comment here
  });
});

// route and handler function for '/game'
app.get('/game', (req, res) => {
  const userResponse = req.query.play

  if (userResponse === 'yes') {
    console.log('yes')
    res.render('game.html')
  } else if (userResponse === 'no') {
    res.render('goodbye.html')
  }
})

// madlib templates
const templates = {
  1: 'There once was a {color} {noun} sitting in the Devmountain Lab. When {person} went to pick it up, it burst into flames in a totally {adjective} way.',
  2: 'Have you ever heard the tragedy of Darth {person} the {adjective}? I thought not, it is not a story the Jedi would tell you. Darth {person} was so powerful and so wise he could use the Force to influence the midichlorians to create {noun}...',
  3: 'When {person} drove past in their {noun} and winked at me, I got all {color} in the face.',
  4: '{person} is a very {adjective} person. {person} has {color} hair and {color} eyes. {person} likes to jump on {noun} until they fall off of {noun}'
}


// route and handler function for '/madlib'
app.get('/madlib', (req, res) => {
  let randomKey = (Math.floor(Math.random() * Object.keys(templates).length) + 1).toString()
  console.log('randomKey = ' + randomKey)

  // rendering madlib.html and passing word variables and random template
  res.render('madlib.html', {
    person: req.query.person,
    color: req.query.color,
    noun: req.query.noun,
    adjective: req.query.adjective,
    template: templates[randomKey]
  })
})