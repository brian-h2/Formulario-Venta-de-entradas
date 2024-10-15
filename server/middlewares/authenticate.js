import jwt from 'jsonwebtoken';

export const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1]; // Dividir solo si comienza con 'Bearer '
  
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          return res.status(403).json({token, message: 'Token inválido o expirado' });
          
        }
        req.user = user;
        next();
      });
    } else {
      res.status(401).json({ message: 'Autorización denegada. No se proporcionó el token' });
    }
  };