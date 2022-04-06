import api from "../api";

class Authorization {
  // isLoggedIn() {}

  async login({ email, password }) {
    const response = await api.login({ email, password });
    if (response.isError) {
      alert("발생발생");
      return;
    }
    location.href = "/";
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
