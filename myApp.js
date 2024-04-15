require('dotenv').config();

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// console.log('Hello World');
// app.get('/', (req, res) => {
//   res.send('Hello Express');
// });

// app.use(express.static(__dirname + '/public'));
app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile((absolutePath = __dirname + '/views/index.html'));
});
app.get('/json', (req, res) => {
  res.json({ message: 'hello json' });
});

//chaining
app.get(
  '/now',
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.json({ time: req.time });
  }
);

// Get Route Parameter Input from the Client
app.get('/:word/echo', (req, res) => {
  word = req.params.word;
  res.json({ echo: word });
});

//Get Query Parameter Input from the Client
app.get('/name', function (req, res) {
  console.log(req.query);
  let firstName = req.query.first;
  let lastName = req.query.last;
  console.log(req.query.first);
  res.json({
    name: `${firstName} ${lastName}`,
  });
});

app.post('/name', function (req, res) {
  let string = req.body.first + ' ' + req.body.last;
  res.json({ name: string });
});

// app
//   .route('/name')
//   .get((req, res) => {
//     const { first, last } = req.query;
//     const fullName = `${first} ${last}`;
//     res.json({ name: fullName });
//   })
//   .post((req, res) => {
//     let fullName = req.body.first + ' ' + req.body.last;
//     res.json({ name: fullName });
//   });

// app.get('/json', (req, res) => {
//   res.json({ message: 'Hello json' });
// });
// var message = 'Hello json';
// app.get('/json', (req, res) => {
//   if (process.env['MESSAGE_STYLE'] === 'uppercase') {
//     res.json({ message: message.toUpperCase() });
//   } else {
//     res.json({ message: message });
//   }
// });

module.exports = app;
