import jwtDecode from 'jwt-decode';
import { AccessToken } from '../interfaces/UserData.interface';

const isExpired = (accessToken: string) => {
  const token: AccessToken = jwtDecode(accessToken);
  const expiredTime = token.exp;

  const time = Date.now();
  const parsedTime = Math.floor(time / 1000);

  return expiredTime - parsedTime < 5;
};

export default isExpired;
