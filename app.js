require('dotenv').config();
var bodyParser = require('body-parser');
var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var mongoose = require('mongoose');
var path = require('path');
var app = express();
var expressJWT = require('express-jwt');

// Mongoose connect
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mernauth', {useMongoClient: true});

// Set up middleware
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.resolve(__dirname, 'client', 'build')));

app.use(function(req, res, next) {
  // before every route, attach the flash messages and current user to res.locals
  res.locals.currentUser = req.user;
  next();
});

// Controllers
app.use('/auth', expressJWT({
	secret: process.env.JWT_SECRET,
	//get the token from the request
	getToken: function fromRequest(req) {
		if(req.body.headers.Authorization && req.body.headers.Authorization.split(' ')[0] === 'Bearer') {
			return req.body.headers.Authorization.split(' ')[1];
		}
		return null;
	}
}).unless({
	path: [
		{ url: '/auth/login', methods: ['POST'] },
		{ url: '/auth/signup', methods: ['POST'] }
	]
}), require('./routes/auth'));
//react lives in client, build, index.html
//swtch build to public for development purposes
app.get('*', function(req, res, next) {
	res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

module.exports = app;
