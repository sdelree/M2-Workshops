const express = require('express');
const app = express();
const InMemoryWorkshop = require('../infrastructure/persistence/inMemoryWorkshop');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', '/ui/ejs'));
app.use(express.static(path.join(__dirname, '..', '/ui/css')));
app.use(bodyParser.urlencoded({extended: false}));


app.get('/', function(req, res) {
  InMemoryWorkshop.getWorkshopList()
      .then((workshops) => {
        res.render('index', {
          workshops: workshops
        });
      });
});

app.get('/workshop', function(req, res) {
  res.render('workshop');
});

app.post('/workshop', function(req, res) {
  const name = req.body.name;
  const description = req.body.description;
  InMemoryWorkshop.addWorkshop(name, description).then(() => {
    InMemoryWorkshop.getWorkshopList()
        .then((workshops) => {
          res.render('index', {
            workshops: workshops
          });
        });
  })
      .catch((e) => res.send(e.message));
});

app.get('/workshop/:name', function(req, res) {
  const workshopName = req.params.name;
  InMemoryWorkshop.getWorkshopByName(workshopName)
      .then((workshop) => {
        res.render('workshop', workshop);
      })
      .catch((e) =>res.send(e.message));
});

app.post('/remove-workshop', function(req, res) {
  res.status(500).send('TODO');
});

app.post('/update-workshop', function(req, res) {
  res.status(500).send('TODO');
});

app.listen(3000, function() {
  console.log('Workshop app listening on port 3000!');
});
