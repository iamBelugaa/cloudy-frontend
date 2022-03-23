const express = require('express');
const httpErrors = require('http-errors');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
app.disable('x-powered-by');

// --------------- Middlewares --------------- //
app.use(cors());
app.use(helmet());
app.use(compression({ level: 6 }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// --------------- User Routes --------------- //
app.use('/api', require('./routes/client/auth.route'));
app.use('/api', require('./routes/client/dashboard.route'));

// --------------- Admin Routes --------------- //
app.use('/api/admin', require('./routes/admin/auth.route'));
app.use('/api/admin', require('./routes/admin/dashboard.route'));

// --------------- 404 Error Handler --------------- //
app.use((req, res, next) => next(httpErrors.NotFound()));

// --------------- Global Error Handler --------------- //
app.use((error, req, res, next) => {
  if (error.status === 404) {
    return res.status(404).render('errors/404');
  } else {
    return res.status(error.status || 500).json({
      ok: false,
      status: error.status || 500,
      message: error.message || 'Something Went Wrong. Please Try Again Later.',
    });
  }
});

module.exports = app;
