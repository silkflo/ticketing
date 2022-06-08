import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { Password } from '../services/password';
import { User } from '../models/user';
import { validateRequest, BadRequestError } from '@silkflo-tickets/common';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUSer = await User.findOne({ email });
    //console.log('EXISTING USER: ', existingUSer);
    if (!existingUSer) {
      throw new BadRequestError('Invalid credential');
    }
    const passwordMatch = await Password.compare(
      existingUSer.password,
      password
    );
    if (!passwordMatch) {
      throw new BadRequestError('Invalid credential');
    }

    //Generate Json web token
    const userJwt = jwt.sign(
      {
        id: existingUSer.id,
        email: existingUSer.email,
      },
      //exclamation overwite type typescript error
      process.env.JWT_KEY!
    );

    //store it on session object
    req.session = { jwt: userJwt };
    // to check the tocker, decode base64, get the string token and paste it on jwt.io with the key 'xxx'

    res.status(200).send(existingUSer);
  }
);

export { router as signinRouter };
