class LoginUser {
  async login(loginUserInfo: { email: string; password: string }) {
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginUserInfo),
      });

      return [response.ok, await response.json()];
    } catch (error) {
      throw new Error('로그인에 실패했습니다. 개발자에게 문의해주세요.');
    }
  }
}

export default LoginUser;
