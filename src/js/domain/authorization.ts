import api from "../api";
import { getCookie } from "../util/general";

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
      alert("이메일 혹은 비밀번호가 잘못 되었습니다.");
      return;
    }
    location.href = "/";
    document.cookie = `user_id=${response.user.id}`;
    document.cookie = `access_token=${response.accessToken}`;
  }

  async signUp({ email, name, password, confirmPassword }) {
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    const response = await api.signUp({ email, name, password });
    if (response.isError) {
      alert("이미 존재하는 이메일입니다.");
      return;
    }
    location.href = "/#!login";
  }
}

export default Authorization;
