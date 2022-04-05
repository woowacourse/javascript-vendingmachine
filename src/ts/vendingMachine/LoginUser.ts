import { LOGIN_ERROR_MESSAGE } from '../constant/errorMessage';
import { postLoginServer } from '../utils/fetchServer';

class LoginUser {
  async login(loginUserInfo: { email: string; password: string }) {
    try {
      return postLoginServer(loginUserInfo);
    } catch (error) {
      throw new Error(LOGIN_ERROR_MESSAGE.FAIL);
    }
  }
}

export default LoginUser;
