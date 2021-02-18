const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet'); // what does helmet do?
const cookieParser = require('cookie-parser');

const routes = require('./routes');


const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(routes);

if (!isProduction) {
  app.use(cors());
}

app.use(helmet({
    contentSecurityPolicy: false
  }));

  app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true,
      },
    })
  );
  
  
  module.exports = app;