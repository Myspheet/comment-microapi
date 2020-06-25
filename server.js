const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const commentRoutes = require('./routes/comments');

const app = express();

//connect to mongodb
mongoose
  .connect(
    'mongodb+srv://fg-expense-tracker:backend@fg-expense-tracker-c1uom.mongodb.net/fg-expense-tracker?retryWrites=true&w=majority',
    {
      useNewUrlParser: true, // for connection warning
      useUnifiedTopology: true,
    },
    () => {
      console.log(
        '\n \t Database connection has been established successfully'
      );
    }
  )
  .catch((err) => {
    console.error('App starting error:', err.stack);
    process.exit(1);
  });

// setup middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

//setup app routes
// app.get('/documentation', doc);
app.use('/comments', commentRoutes);

/*
    |||  I'll use route method to handle request and response circle  |||
*/
// catch 404 and forward to error handler
/* app.use((req, res, next) => {
  next(createError(404));
});
*/

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.sendStatus(err.status || 500);
  res.send('error');
});

module.exports = app;
