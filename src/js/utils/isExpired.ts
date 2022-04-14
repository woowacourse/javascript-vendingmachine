import jwtDecode from 'jwt-decode';
import { ERROR_MESSAGE } from '../constants';
import { AccessToken } from '../interfaces/UserData.interface';
import throwableFunctionHandler from './throwableFunctionHandler';

const isExpired = (accessToken: string) => {
  try {
    const token: AccessToken = jwtDecode(accessToken);
    const expiredTime = token.exp;

    const time = Date.now();
    const parsedTime = Math.floor(time / 1000);
    console.log(expiredTime - parsedTime);

    return expiredTime - parsedTime < 5;
  } catch ({ message }) {
    switch (message) {
      case 'Invalid token specified':
        throwableFunctionHandler(() => {
          throw new Error(ERROR_MESSAGE.INVALID_ACCESS_TOKEN);
        });
    }
    return true;
  }
};

export default isExpired;
