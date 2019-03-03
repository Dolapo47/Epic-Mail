import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../db/userDB';

const router = express.Router();

// eslint-disable-next-line consistent-return
router.post('/signup', (req, res, next) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  if (!req.body.email) {
    return res.status(400).send({
      success: false,
      message: 'title is required',
    });
  } if (!req.body.firstName) {
    return res.status(400).send({
      success: false,
      message: 'first name is required',
    });
  } if (!req.body.lastName) {
    return res.status(400).send({
      success: false,
      message: 'last name is required',
    });
  } if (!req.body.email) {
    return res.status(400).send({
      success: false,
      message: 'email is required',
    });
  } if (!req.body.password) {
    return res.status(400).send({
      success: false,
      message: 'password is required',
    });
  } if (!req.body.isAdmin) {
    return res.status(400).send({
      success: false,
      message: 'admin status is required',
    });
  }
  const user = {
    id: db.length + 1,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: hashedPassword,
    isAdmin: req.body.isAdmin,
  };

  db.push(user);
  // eslint-disable-next-line no-unreachable
  const token = jwt.sign({ id: user.id }, 'dolapo', {
    expiresIn: 86400, // expires in 24 hours
  });
  res.status(201).send({
    status: 201,
    data: 'User created successfully',
    user,
    auth: true,
    token,
  });
});

module.exports = router;
