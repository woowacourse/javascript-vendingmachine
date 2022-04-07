import { AdminData, AdminEmail, AdminPassword } from '../../index.d';
import { ERROR_MESSAGE } from '../constant';
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

    if (!response.ok) throw new Error(ERROR_MESSAGE.OVERLAP_EMAIL);
  }

  async modifyAdmin(admin: AdminData, id: number, key: string) {
    const response = await fetch(`${this.host}/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        email: admin.email,
        name: admin.name,
        password: admin.password,
      }),
    });

    if (!response.ok) throw new Error(ERROR_MESSAGE.INVALID_EMAIL_PASSWORD);
  }

  async login(email: AdminEmail, password: AdminPassword) {
    const response = await fetch(`${this.host}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error(ERROR_MESSAGE.INVALID_EMAIL_PASSWORD);

    const body = await response.json();

    return {
      key: body.accessToken,
      id:  body.user.id,
      name: body.user.name,
    };
  }

  async getEmail(id: number, key: string) {
    const response = await fetch(`${this.host}/600/users/${id}`, { 
      method: 'GET', 
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });

    if (!response.ok) throw new Error(ERROR_MESSAGE.NOT_EXIST_ADMIN);

    const admin = await response.json();

    return admin.email;
  }
}
