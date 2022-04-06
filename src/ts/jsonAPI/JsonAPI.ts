import { SignupData } from '../../index.d';
import API from '../interactor/API';

export default class JsonAPI implements API {
  private host: string;

  constructor() {
    this.host = 'http://localhost:3000';
  }

  async signup(admin: SignupData) {
    const response = await fetch(`${this.host}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(admin),
    });

    if (!response.ok) throw new Error('중복된 이메일 입니다!');
  }
}
