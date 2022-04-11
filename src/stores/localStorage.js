export const accessTokenStorage = {
  setAccessToken(token) {
    localStorage.setItem('accessToken', JSON.stringify(token));
  },
  getAccessToken() {
    return JSON.parse(localStorage.getItem('accessToken'));
  },
};

export const userIdStorage = {
  setUserId(userId) {
    localStorage.setItem('userId', JSON.stringify(userId));
  },
  getUserId() {
    return JSON.parse(localStorage.getItem('userId'));
  },
};

export const userInfoStorage = {
  setUserInfo(userInfo) {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  },
  getUserInfo() {
    return JSON.parse(localStorage.getItem('userInfo'));
  },
};
