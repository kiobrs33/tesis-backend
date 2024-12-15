import jwt from 'jsonwebtoken';

export class JwtUtil {
  constructor() {}

  public generateJwt = (userId: string = '') => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      // Manejamos el caso cuando secret es undefined
      throw new Error('JWT_SECRET no esta definido');
    }

    return new Promise((resolve, reject) => {
      const payload = { userId };
      jwt.sign(
        payload,
        secret,
        {
          expiresIn: '168h',
        },
        (err, token) => {
          if (err) {
            console.log(err);
            reject('No se pudo generar el token!');
          } else {
            resolve(token);
          }
        }
      );
    });
  };

  public verifyJwt = async (token: any) => {
    try {
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        // Manejamos el caso cuando secret es undefined
        throw new Error('JWT_SECRET no esta definido');
      }

      return jwt.verify(token, secret);
    } catch (error: any) {
      return error;
    }
  };
}
