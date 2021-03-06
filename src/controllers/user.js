import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import joi from 'joi';
import { userDetails } from '../db/userDB';

dotenv.config();

class usercontroller {
  static signUp(req, res) {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    const user = {
      id: userDetails.length + 1,
      email: req.body.email.trim(),
      firstName: req.body.firstName.trim(),
      lastName: req.body.lastName.trim(),
      password: hashedPassword,
      isAdmin: req.body.isAdmin,
    };
    const schema = joi.object().keys({
      email: joi.string().email().required(),
      password: joi.string().min(5).max(10).required(),
      firstName: joi.string().max(20).required(),
      lastName: joi.string().max(20).required(),
      isAdmin: joi.boolean().required(),
    });

    joi.validate(req.body, schema, (err, result) => {
      if (err) {
        res.send('error in user input');
      }
      userDetails.push(user);
      const token = jwt.sign({ id: user.id }, process.env.SECRET, {
        expiresIn: 86400,
      });
      res.status(201).json({
        status: 201,
        data: [user, { auth: true, token }],
        success: true,
      });
    });
  }

  static signIn(req, res) {
    userDetails.map((user) => {
      if (user.email === req.body.email) {
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
          return res.status(401).json({ auth: false, token: null });
        }
        const token = jwt.sign({ email: user.email }, process.env.SECRET, {
          expiresIn: 86400,
        });
        res.status(200).json({
          auth: true,
          token,
          success: true,
        });
      }
      return user;
    });
  }

  static welcome(req, res) {
    res.status(200).json({
      message: 'Welcome to Epic Mail',
      success: true,
    });
  }
}


export default usercontroller;
