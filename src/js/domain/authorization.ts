import api from "../api";
import { ERROR_MESSAGE } from "../constant";
import { getCookie } from "../util/general";
import { checkUserNameLength, checkConfirmPassword } from "../util/validations";

class Authorization {
  async isLoggedIn() {
    const userId = getCookie("user_id");
    const accessToken = getCookie("access_token");
    const response = await api.getUser(userId, accessToken);
    return response;
  }

  async login({ email, password }) {
    const response = await api.login({ email, password });
    if (response.isError) {
      throw new Error(ERROR_MESSAGE.WRONG_LOGIN_INFORMATION);
    }
    location.href = "/";
    document.cookie = `user_id=${response.user.id}`;
    document.cookie = `access_token=${response.accessToken}`;
  }

  async signUp({ email, name, password, confirmPassword }) {
    checkUserNameLength(name);
    checkConfirmPassword(password, confirmPassword);
    const response = await api.signUp({ email, name, password });
    if (response.isError) {
      throw new Error(ERROR_MESSAGE.EXISTED_EMAIL);
    }
    location.href = "/#!login";
  }

  logout() {
    document.cookie = `user_id=;`;
    document.cookie = `access_token=;`;
    location.href = "/";
  }

  async updateUserInfo(userId, user) {
    checkUserNameLength(user.name);
    checkConfirmPassword(user.password, user.confirmPassword);
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
