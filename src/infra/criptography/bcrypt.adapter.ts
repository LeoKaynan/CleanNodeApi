import bcrypt from 'bcrypt';
import {Encrypter} from '../../data/protocols/encrypter';

export class BcryptAdapter implements Encrypter {
  async encrypt(val: string): Promise<string> {
    return await bcrypt.hash(val, 12);
  }
}
