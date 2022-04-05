import { AuthActionType, AuthStoreInterface } from './types';
import { accessTokenStorage, userIdStorage, userInfoStorage } from './localStorage';

class AuthStore implements AuthStoreInterface {
  mutateState({ actionType, payload }: { actionType: AuthActionType; payload: unknown }) {
    if (actionType === 'signIn') {
      this.signInUserInfo(payload);
    }
    if (actionType === 'login') {
      this.login(payload);
    }
    if (actionType === 'logout') {
      this.logOut();
    }
    if (actionType === 'editUserInfo') {
      this.editUserInfo(payload);
    }
  }

  async signInUserInfo(payload) {
    const { email, name, password } = payload;

    const userData = JSON.stringify({ email, name, password });

    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: userData,
      });

      if (response.status === 400) {
        throw new Error('회원가입에 실패하였습니다!');
      }

      const {
        accessToken,
        user: { id },
      } = await response.json();

      accessTokenStorage.setAccessToken(accessToken);
      userIdStorage.setUserId(id);
      await this.setLoginUserInfo();
      window.location.href = 'http://localhost:9000/#';
    } catch ({ message }) {
      alert(message);
    }
  }

  async login(payload) {
    const { email, password } = payload;

    const loginData = JSON.stringify({ email, password });

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: loginData,
      });
      if (response.status === 400) {
        throw new Error('아이디와 비밀번호를 다시 확인해주세요');
      }

      const {
        accessToken,
        user: { id },
      } = await response.json();

      accessTokenStorage.setAccessToken(accessToken);
      userIdStorage.setUserId(id);
      await this.setLoginUserInfo();
      window.location.replace('http://localhost:9000/#');
      window.location.reload();
    } catch ({ message }) {
      alert(message);
    }
  }

  logOut() {
    localStorage.clear();
    window.location.href = 'http://localhost:9000/#';
    window.location.reload();
  }

  async setLoginUserInfo() {
    const userId = userIdStorage.getUserId();
    if (userId.length === 0) {
      return false;
    }
    try {
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 400) {
        throw new Error('로그인유저의 정보를 가져오는 것에 실패했습니다');
      }
      const { email, name } = await response.json();
      const userInfo = { userEmail: email, userName: name };
      userInfoStorage.setUserInfo(userInfo);
    } catch ({ message }) {
      alert(message);
    }
  }

  async editUserInfo(payload) {
    const userId = userIdStorage.getUserId();
    const { name, password } = payload;

    try {
      const editedData = JSON.stringify({ name, password });

      const editResponse = await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: editedData,
      });

      if (editResponse.status === 400) {
        throw new Error('회원 정보 수정에 실패하였습니다');
      }

      await this.setLoginUserInfo();
      window.location.href = 'http://localhost:9000/#';
    } catch ({ message }) {
      alert(message);
    }
  }
}

export default new AuthStore();
