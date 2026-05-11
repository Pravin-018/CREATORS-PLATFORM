const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = require('../data/users');

const generateToken = (payload) => {
  const secret = process.env.JWT_SECRET || 'default-secret';
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  return jwt.sign(payload, secret, { expiresIn });
};

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      const error = new Error('Name, email, and password are required');
      error.status = 400;
      throw error;
    }

    if (users.findByEmail(email)) {
      const error = new Error('Email is already registered');
      error.status = 409;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = users.createUser({ name, email, password: hashedPassword });
    const token = generateToken({ userId: user.id, email: user.email });

    res.status(201).json({ success: true, token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error('Email and password are required');
      error.status = 400;
      throw error;
    }

    const user = users.findByEmail(email);
    if (!user) {
      const error = new Error('Invalid email or password');
      error.status = 401;
      throw error;
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      const error = new Error('Invalid email or password');
      error.status = 401;
      throw error;
    }

    const token = generateToken({ userId: user.id, email: user.email });
    res.json({ success: true, token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
