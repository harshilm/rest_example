var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

var cart = [{
  id:1,
  title:"Cart1",
  item:"iphone 5",
  description:"Apple iphone",
},{
  id:2,
  title:"Cart2",
  item:"iphone 5",
  description:"Apple iphone",
},{
  id:3,
  title:"Cart4",
  item:"iphone 5",
  description:{
    data:"trying nesting of object",
  },
}];

app.get('/cart',function(req, res) {
  res.json(cart);

});

app.get('/cart/:id',function(req, res) {
  var id = req.params.id;
  res.json(cart[id]);

});

app.post('/cart', function(req, res) {
  cart.push(req.body);
  res.json(cart);
});

app.put('cart/:id', function(req, res) {
  var body = req.body;
  var cartToedit = cart[req.params.id];
  cartToedit = body;
  cart.push(cartToedit);
  res.json(cart);


});

app.delete('/cart/:id', function(req, res) {
  var itemTodelete = req.params.id;
  cart.splice(1, itemTodelete);
  res.json(cart);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(3000, function(){
  console.log("Server is running all good");
});
module.exports = app;
