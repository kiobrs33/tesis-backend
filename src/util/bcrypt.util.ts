import bcrypt from 'bcryptjs';

export class BcryptUtil {
  constructor() {}

  public encrypt = async (text: string) => {
    return await bcrypt.hash(text, 10);
  };

  public compare = async (oldText: string, hashText: string) => {
    return await bcrypt.compare(oldText, hashText);
  };

  //TODO : Agregar funcionalidad para ver contraseñas
}
