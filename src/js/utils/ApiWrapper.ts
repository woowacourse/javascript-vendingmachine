import { SERVER_URL } from '../constants';

class ApiWrapper {
  SERVER_URL: string;
  header: HeadersInit;

  constructor() {
    this.SERVER_URL = SERVER_URL;
    this.header = { 'Content-Type': 'application/json' };
  }

  async post(path: string, bodyData: Object) {
    const response = await fetch(this.SERVER_URL + path, {
      method: 'POST',
      headers: this.header,
      body: JSON.stringify(bodyData),
    });

    return response;
  }

  async put(path: string, bodyData: Object) {
    const response = await fetch(this.SERVER_URL + path, {
      method: 'PUT',
      headers: this.header,
      body: JSON.stringify(bodyData),
    });

    return response;
  }
}

export default ApiWrapper;
