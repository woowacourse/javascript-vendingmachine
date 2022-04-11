import api from "../api";
import { ERROR_MESSAGE, COOKIE_KEY, HASH } from "../constant";
import { getCookie, setCookie, clearCookie, routerPush } from "../util/general";
import { ILoginOption, ISignUpEvent, IUpdateUserOption } from "../type";
import {
  checkUserNameLength,
  checkConfirmPassword,
  checkValidPassword,
} from "../util/validations";

class Authorization {
  async getLoggedInUser() {
    const userId = getCookie(COOKIE_KEY.USER_ID);
    const accessToken = getCookie(COOKIE_KEY.ACCESS_TOKEN);
    const response = await api.getUser(userId, accessToken);
    return response;
  }

  async login({ email, password }: ILoginOption) {
    const response = await api.login({ email, password });
    if (response.isError) {
      throw new Error(ERROR_MESSAGE.WRONG_LOGIN_INFORMATION);
    }
    routerPush("/");
    setCookie(COOKIE_KEY.USER_ID, response.user.id);
    setCookie(COOKIE_KEY.ACCESS_TOKEN, response.accessToken);
  }

  async signUp({ email, name, password, confirmPassword }: ISignUpEvent) {
    checkUserNameLength(name);
    checkValidPassword(password);
    checkConfirmPassword(password, confirmPassword);

    const response = await api.signUp({ email, name, password });
    if (response.isError) {
      throw new Error(ERROR_MESSAGE.EXISTED_EMAIL);
    }
    routerPush(`/${HASH.LOGIN}`);
  }

  logout() {
    clearCookie(COOKIE_KEY.USER_ID);
    clearCookie(COOKIE_KEY.ACCESS_TOKEN);
    routerPush("/");
  }

  async updateUserInfo(userId: string, user: IUpdateUserOption) {
    checkUserNameLength(user.name);
    checkConfirmPassword(user.password, user.confirmPassword);
    delete user.confirmPassword;
    const response = await api.updateUserInfo(
      userId,
      user,
      getCookie(COOKIE_KEY.ACCESS_TOKEN)
    );
    routerPush("/");
    if (response.isError) {
      throw new Error("서버에러");
    }
  }
}

export default Authorization;
