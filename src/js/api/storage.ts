import { UserDataType } from '../types/types';

const Storage = {
  KEYS: {
    ACCESS_TOKEN: 'accessToken',
    USER_DATA: 'userData',
  },

  getAccessToken(): string {
    return this.getData(this.KEYS.ACCESS_TOKEN) ?? '';
  },

  setAccessToken(token: string) {
    this.setData(this.KEYS.ACCESS_TOKEN, token);
  },

  getUserData(): UserDataType {
    return this.getData(this.KEYS.USER_DATA);
  },

  setUserData(data: UserDataType) {
    this.setData(this.KEYS.USER_DATA, data);
  },

  deleteUserData() {
    localStorage.removeItem(this.KEYS.ACCESS_TOKEN);
    localStorage.removeItem(this.KEYS.USER_DATA);
  },

  getData(key: string) {
    return JSON.parse(localStorage.getItem(key));
  },

  setData(key: string, data) {
    localStorage.setItem(key, JSON.stringify(data));
  },
};

export default Storage;
