import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import userRoutes from './routes/user';
import messageRoutes from './routes/messages';

const app = express();
morgan('dev');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use('/api/v1', messageRoutes);
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


export default app;
