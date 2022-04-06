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
      alert("발생발생");
      return;
    }
    location.href = "/";
    document.cookie = `user_id=${response.user.id}`;
    document.cookie = `access_token=${response.accessToken}`;
  }

  async signUp({ email, name, password }) {
    const response = await api.signUp({ email, name, password });
    if (response.isError) {
      alert("서버 에러가 발생했어요~");
      return;
    }
    location.href = "/#!login";
  }
}

export default Authorization;
