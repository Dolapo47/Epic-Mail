import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { userDetails } from '../db/userDB';

const router = express.Router();

// eslint-disable-next-line consistent-return
router.post('/signup', (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  if (!req.body.email) {
    return res.status(400).json({
      success: false,
      message: 'title required',
    });
  }
  if (!req.body.firstName) {
    return res.status(400).json({
      success: false,
      message: 'First Name required',
    });
  }
  if (!req.body.lastName) {
    return res.status(400).json({
      success: false,
      message: 'Last name required',
    });
  }
  if (!req.body.password) {
    return res.status(400).json({
      success: false,
      message: 'password required',
    });
  }
  const user = {
    id: userDetails.length + 1,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: hashedPassword,
    isAdmin: req.body.isAdmin,
  };

  userDetails.push(user);
  const token = jwt.sign({ id: user.id }, 'dolapo', {
    expiresIn: 86400,
  });
  res.status(201).json({
    status: 201,
    data: [user, { auth: true, token }],
    success: true,
  });
});

router.post('/signin', (req, res) => {
  userDetails.map((user) => {
    if (user.email === req.body.email) {
      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) {
        return res.status(401).json({ auth: false, token: null });
      }
      const token = jwt.sign({ email: user.email }, 'dolapo', {
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
});

export default router;
