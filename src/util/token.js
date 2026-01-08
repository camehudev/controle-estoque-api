import jwt from 'jsonwebtoken';

const algorithm = { algorithm: 'HS256' };
const expires = {expiresIn: '1h'};
const secret = process.env.API_SECRET;

if (!secret) {
  throw new Error('JWT_SECRET não está definido');
 
}

const token = {
    create(data) {
        return jwt.sign(
        { sub: data.userName }, // payload precisa ser um objeto
        process.env.API_SECRET,
        {
            algorithm: 'HS256',
            expiresIn: '1h'
        }
        );
    },


    validToken(){
        const authHeader = req.headers['authorization'];
       const isValidtoken = jwt.verify(authHeader, process.env.API_SECRET, function(err, decoded) {
            // console.log(decoded.foo) // bar
          });

       return isValidtoken

    }

    
}

export default token