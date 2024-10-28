import jwt from 'jsonwebtoken';
import { pool } from '../config/dbconfig.js';


export const authenticateJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const userAgent = req.headers['user-agent'];
  
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1]; // Dividir solo si comienza con 'Bearer '
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      const result = await pool.query(
        'SELECT * FROM sesiones WHERE user_id = ? AND token = ? AND user_agent = ?',
        [decoded.id, token, userAgent]
      )
      if (result.length > 0) {
        req.user = decoded;
        next();
      } else {
        res.sendStatus(403); 
      }

    } else {
      res.status(401).json({ message: 'Autorización denegada. No se proporcionó el token' });
    }
  };