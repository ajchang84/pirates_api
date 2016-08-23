const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const pirates = require('./routes/pirates');

const app = express();

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/javascripts', express.static(__dirname + "/../client/javascripts"));
app.use('/stylesheets', express.static(__dirname + "/../client/stylesheets"));
app.use('/views', express.static(__dirname + "/../client/views"));

app.use('/api/pirates', pirates);

app.get('*', function(req,res){
  // res.sendFile(__dirname + '/../client/views/layout.html');
  res.sendFile('layout.html', {root: './client/views'});
});

app.get('/', function(req,res){
  res.send('hi');
})

app.listen(3000, function(){
  console.log('listening on port 3000...');
})