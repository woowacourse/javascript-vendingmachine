import { AdminData, AdminEmail, AdminPassword } from '../../index.d';
import API from '../interactor/API';

export default class JsonAPI implements API {
  private host: string;

  constructor() {
    this.host = 'http://localhost:3000';
  }

  async signup(admin: AdminData) {
    const response = await fetch(`${this.host}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: admin.email,
        name: admin.name,
        password: admin.password,
      }),
    });

    if (!response.ok) throw new Error('중복된 이메일 입니다!');
  }

  async login(email: AdminEmail, password: AdminPassword) {
    const response = await fetch(`${this.host}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error('아이디와 비밀번호가 일치하지 않습니다!');

    const body = await response.json();

    return {
      key: body.accessToken,
      id:  body.user.id,
      name: body.user.name,
    };
  }
}
