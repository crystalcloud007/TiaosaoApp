/**
 * Created by Haoran on 2015/8/17.
 */
var express = require('express');
var morgan = require('morgan');
var bodyparser = require('body-parser');
var favicon = require('serve-favicon');
var mongoose = require('mongoose');
var config = require('./config');

var app = express();

//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(morgan('dev'));

mongoose.connect(config.db, function(err)
{
    if(err) console.log(err);
    else console.log('DB connection established');
});

// Render public files
app.use(express.static(__dirname + '/views'));

// APP apis
var user_api = require('./routes/api_user')(app ,express);
var general_api = require('./routes/api_general')(app, express);
//var entry_api = require('./routes/api_entry')(app, express);
//var admin_api = require('./routes/api_admin')(app, express);

app.use('/api/user', user_api);
app.use('/api/gen', general_api);
//app.use('/api/entry', entry_api);
//app.use('/api/admin', admin_api);


// Send html file for home page
app.get('*', function(req,res)
{
    res.sendFile(__dirname + '/views/index.html');
});

app.listen(config.port, function(err)
{
    if(err) console.log(err);
    else console.log('Listening to PORT ' + config.port);
});