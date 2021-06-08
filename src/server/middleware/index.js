var admin = require('firebase-admin');
var errorHandler = require('express-json-errors');
const bearerToken = require('express-bearer-token');
import { guard } from './guard';

// Json filename shouldn't change each time it's generated (if it does, update this)
var serviceAccount = require('../../config/firebase');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://true360-dev-1.firebaseio.com',
});

module.exports = app => {
  app.use(bearerToken()); // Parse out the Bearer Token
  app.use(errorHandler());
  app.use('/', function(req, res, next) {
    console.log(req.originalUrl);
    if (req.originalUrl === '/' || req.originalUrl === '/favicon.ico') {
      return res.sendStatus(200);
    } else {
      // // Bypass auth for registration
      // if (
      //   req.originalUrl === '/api/moxieuser' ||
      //   req.originalUrl === '/moxieuser'
      // ) {
      //   next();
      // } else
      if (req.method !== 'OPTIONS') {
        guard(admin, req, res, next);
        // next();
      } else {
        next();
      }
    }
  });
};
