import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use('/api/v1/auth', userRoutes);

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      error: 'route not found',
    },
  });
});

module.exports = app;
