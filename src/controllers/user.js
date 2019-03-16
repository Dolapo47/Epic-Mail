import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import joi from 'joi';
import { userDetails } from '../db/userDB';


dotenv.config();

// eslint-disable-next-line consistent-return
exports.createSignUp = (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);

  const user = {
    id: userDetails.length + 1,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: hashedPassword,
    isAdmin: req.body.isAdmin,
  };
  const schema = joi.object().keys({
    email: joi.string().trim().email().required(),
    password: joi.string().min(5).max(10).required(),
    firstName: joi.string().trim().max(20).required(),
    lastName: joi.string().trim().max(20).required(),
    isAdmin: joi.boolean().required(),
  });

  joi.validate(req.body, schema, (err, result) => {
    if (err) {
      res.send('error');
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
};

exports.createSignIn = (req, res) => {
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
};

exports.welcome = (req, res) => {
  res.status(200).json({
    message: 'Welcome to Epic Mail',
    success: true,
  });
};
