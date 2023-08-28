
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const dbRoutes= require('./routes/dbRoutes');


const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');


const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(cors({
  origin: '*'
}));
// app.options('*', cors());
app.use(express.static('./public'));




app.use('/api/v1/livepods', dbRoutes);



app.all('*', (req, res, next) => {
    const err = new AppError(`Can't find ${req.originalUrl} on this server`, 404);
    next(err);
  });
  
  app.use(globalErrorHandler);


module.exports = app;