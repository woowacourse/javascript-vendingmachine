export default class AuthManager {
  private static instance: AuthManager;
  private baseUrl = 'http://localhost:3000';
  private types = {
    signIn: '/signin',
    signUp: '/signup',
  };
  private _accessToken = '';
  private _userData = {
    email: '',
    name: '',
    password: '',
  };

  static shared() {
    if (!AuthManager.instance) {
      AuthManager.instance = new AuthManager();
    }
    return AuthManager.instance;
  }

  get accessToken() {
    return this._accessToken;
  }

  get userData() {
    return this._userData;
  }

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
    this._accessToken = accessToken;
    this._userData = user;
  }

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
    this._accessToken = accessToken;
    this._userData = user;
  }
}
