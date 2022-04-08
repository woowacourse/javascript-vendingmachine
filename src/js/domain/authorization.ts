import api from "../api";
import { ERROR_MESSAGE } from "../constant";
import { getCookie, setCookie, clearCookie } from "../util/general";
import { ILoginOption, ISignUpEvent, IUpdateUserOption } from "../type";
import {
  checkUserNameLength,
  checkConfirmPassword,
  checkValidPassword,
} from "../util/validations";

class Authorization {
  async isLoggedIn() {
    const userId = getCookie("user_id");
    const accessToken = getCookie("access_token");
    const response = await api.getUser(userId, accessToken);
    return response;
  }

  async login({ email, password }: ILoginOption) {
    const response = await api.login({ email, password });
    if (response.isError) {
      throw new Error(ERROR_MESSAGE.WRONG_LOGIN_INFORMATION);
    }
    location.href = "/";
    setCookie("user_id", response.user.id);
    setCookie("access_token", response.accessToken);
  }

  async signUp({ email, name, password, confirmPassword }: ISignUpEvent) {
    checkUserNameLength(name);
    checkValidPassword(password);
    checkConfirmPassword(password, confirmPassword);

    const response = await api.signUp({ email, name, password });
    if (response.isError) {
      throw new Error(ERROR_MESSAGE.EXISTED_EMAIL);
    }
    location.href = "/#!login";
  }

  logout() {
    clearCookie("user_id");
    clearCookie("access_token");
    location.href = "/";
  }

  async updateUserInfo(userId: string, user: IUpdateUserOption) {
    checkUserNameLength(user.name);
    checkConfirmPassword(user.password, user.confirmPassword);
    delete user.confirmPassword;
    const response = await api.updateUserInfo(
      userId,
      user,
      getCookie("access_token")
    );
    location.href = "/";
    if (response.isError) {
      throw new Error("서버에러");
    }
  }
}

export default Authorization;
