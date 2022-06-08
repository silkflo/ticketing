import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from '@silkflo-tickets/common';
import cookieSession from 'cookie-session';
import { newOrderRouter } from './routes/new';
import { showOrderRouter } from './routes/show';
import { indexOrderRouter } from './routes';
import { deleteOrderRouter } from './routes/delete';

const app = express();
//#video 173 trust proxy
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);
app.use(currentUser);

app.use(deleteOrderRouter);
app.use(indexOrderRouter);
app.use(newOrderRouter);
app.use(showOrderRouter);

//url incorrect throw an error
app.all('*', async (req, res, next) => {
  throw new NotFoundError();
  //use of  'express-async-errors' to bypass the async error
});

app.use(errorHandler);

export { app };
