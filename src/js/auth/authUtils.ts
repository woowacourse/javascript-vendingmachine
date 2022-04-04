const authUtils = {
  baseUrl: 'http://localhost:3000',
  implementation: '/signin',

  async getUserData({ email, password }) {
    const response = await fetch(this.baseUrl + this.implementation, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = response.json();
    console.log(data);
  },
};
