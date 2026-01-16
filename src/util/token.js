import jwt from 'jsonwebtoken';

const secret = process.env.API_SECRET;

if (!secret) {
  throw new Error('API_SECRET não está definido');
}

const token = {
  create(data) {
    return jwt.sign(
      { sub: data.userName },
      secret,
      {
        algorithm: 'HS256',
        expiresIn: '1h'
      }
    );
  },

  validate(token) {
    return jwt.verify(token, secret);
  }
};

export default token;
