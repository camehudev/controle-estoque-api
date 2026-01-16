import jwt from 'jsonwebtoken';

const secret = process.env.API_SECRET;

if (!secret) {
  throw new Error('API_SECRET não está definido');
}

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  // remove "Bearer" mesmo se vier duplicado
  const token = authHeader.replace(/Bearer\s+/g, '').trim();

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido ou expirado' });
  }
};

export default authMiddleware;
