/**
 * Created by Haoran on 2015/8/17.
 */
var express = require('express');
var morgan = require('morgan');
var bodyparser = require('body-parser');
var favicon = require('serve-favicon');
var mongoose = require('mongoose');
var config = require('./configs/config');

var app = express();




app.use(favicon(__dirname + '/public/favicon.ico'));
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

// Set response header
/*app.all('*',function(req,res,next)
{
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", '3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});*/

// APIs
var user_api = require('./routes/api_user')(app ,express);
var general_api = require('./routes/api_general')(app, express);
var help_api = require('./routes/api_help')(app,express);
var entry_api = require('./routes/api_entry')(app,express);
var admin_api = require('./routes/api_admin')(app, express);
var ad_api = require('./routes/api_ad')(app, express);

app.use('/api/user', user_api);
app.use('/api/gen', general_api);
app.use('/api/help', help_api);
app.use('/api/entry', entry_api);
app.use('/api/admin', admin_api);
app.use('/api/ad',ad_api);


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