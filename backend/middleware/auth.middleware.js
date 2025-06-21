import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.model.js';

dotenv.config();

export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer token

  if (!token) return res.status(401).json({ message: 'Not authorized, no token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token failed' });
  }
};

// Role based middleware
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: `Role '${req.user.role}' not allowed` });
    }
    next();
  };
};
