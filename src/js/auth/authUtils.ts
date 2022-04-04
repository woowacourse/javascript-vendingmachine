export const authUtils = {
  baseUrl: 'http://localhost:3000',
  types: {
    signIn: '/signin',
    signUp: '/signup',
  },
  accessToken: '',

  async signIn({ email, password }) {
    const response = await fetch(this.baseUrl + this.types.signIn, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('로그인에 실패했습니다.');
    }

    const { accessToken, user } = await response.json();
    this.accessToken = accessToken;
    return user;
  },

  async singUp({ email, name, password }) {
    const response = await fetch(this.baseUrl + this.types.signUp, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ email, name, password }),
    });

    if (!response.ok) {
      throw new Error('회원가입에 실패했습니다.');
    }

    const { accessToken, user } = await response.json();
    this.accessToken = accessToken;
    return user;
  },
};
