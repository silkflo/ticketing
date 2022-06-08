import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest, BadRequestError } from '@silkflo-tickets/common';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    //use of express validator library : this is the validation
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // console.log('Email in use');
      // return res.send({});
      throw new BadRequestError('Email in use');
    }

    const user = User.build({ email, password });
    await user.save();

    //Generate Json web token
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      //exclamation overwite type typescript error
      process.env.JWT_KEY!
    );

    //store it on session object
    req.session = { jwt: userJwt };
    // to check the tocker, decode base64, get the string token and paste it on jwt.io with the key 'xxx'

    res.status(201).send(user);
  }
);

export { router as signupRouter };
