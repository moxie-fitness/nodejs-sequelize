import express from 'express';
import logger from 'morgan';
import { json, urlencoded } from 'body-parser';
import { default as routes } from './server/routes';
import cors from 'cors';

// Set up the express app
const app = express();
app.use(cors());

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(json());
app.use(urlencoded({ extended: false }));

// Add middleware to the application
require('./server/middleware')(app);

// Add routes to the application
routes(app);

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) =>
  res.status(200).send({
    message:
      'True 360 API hit > No valid route found. Check your request for typos, request type, & params.',
  })
);

export default app;
