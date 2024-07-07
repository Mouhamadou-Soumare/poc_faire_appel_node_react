import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token requis' });
  }
  jwt.verify(token, 'your_jwt_secret', async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token invalide' });
    }
    req.user = decoded;
    next();
  });
};

export const authorizeRoles = (...roles) => {
  return async (req, res, next) => {
    const user = await User.findByPk(req.user.id);
    if (!roles.includes(user.role)) {
      return res.status(403).json({ message: 'Accès interdit' });
    }
    next();
  };
};
