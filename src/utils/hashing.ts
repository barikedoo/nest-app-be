import * as bcrypt from 'bcrypt';
const saltRounds = 10;

export const hash = async (str: string): Promise<string> => {
  return await bcrypt.hash(str, saltRounds).then((hash: string) => {
    return hash;
  });
};

export const compareHash = async (
  str: string,
  hash: string,
): Promise<boolean> => {
  return await bcrypt.compare(str, hash).then((res: boolean) => res);
};
