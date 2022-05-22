export interface Encrypter {
  encrypt(val: string): Promise<string>;
}
