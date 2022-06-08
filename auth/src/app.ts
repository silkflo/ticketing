import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler, NotFoundError } from '@silkflo-tickets/common';
import cookieSession from 'cookie-session';

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

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

//url incorrect throw an error
app.all('*', async (req, res, next) => {
  throw new NotFoundError();
  //use of  'express-async-errors' to bypass the async error
});

app.use(errorHandler);

export { app };
