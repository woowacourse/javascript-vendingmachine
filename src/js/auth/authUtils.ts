export const authUtils = {
  baseUrl: 'http://localhost:3000',
  type: '/signin',

  async getUserData({ email, password }) {
    try {
      const response = await fetch(this.baseUrl + this.type, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = response.json();
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  },
};
