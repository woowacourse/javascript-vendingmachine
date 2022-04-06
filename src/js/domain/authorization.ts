import api from "../api";

class Authorization {
  // isLoggedIn() {}
  // login() {}

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
