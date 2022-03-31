export const accessTokenStorage = {
  setAccessTokenStorage(token) {
    localStorage.setItem('accessToken', JSON.stringify(token));
  },
  getAccessTokenStorage() {
    return JSON.parse(localStorage.getItem('accessToken'));
  },
};

export const userIdStorage = {
  setUserIdStorage(userId) {
    localStorage.setItem('userId', JSON.stringify(userId));
  },
  getUserIdStorage() {
    return JSON.parse(localStorage.getItem('userId'));
  },
};
