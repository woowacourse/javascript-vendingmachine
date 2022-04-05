import storage from '../storage';
import { on, $ } from '../utils';

class Auth {
  constructor() {
    on('.signup-form', '@signup', (e) => this.signup(e.detail), $('sign-up'));
    on('.signin-form', '@signin', (e) => this.signin(e.detail), $('sign-in'));
    on('.edit-profile-form', '@editProfile', (e) => this.editProfile(e.detail), $('edit-profile'));
  }

  async signup(userInfo) {
    try {
      const { email, userName, password, passwordConfirm } = userInfo;

      if (password !== passwordConfirm) {
        throw new Error('비밀번호가 일치하지 않습니다.');
      }

      const response = await fetch('https://js-vendingmachine-server.herokuapp.com/signup', {
        method: 'POST',
        body: JSON.stringify({
          email,
          userName,
          password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('중복된 이메일이 존재합니다.');
      }
    } catch (e) {
      alert(e.message);
    }

    // 로그인 페이지 전환 로직 추가
  }

  async signin(userInfo) {
    try {
      const { email, password } = userInfo;

      const response = await fetch('https://js-vendingmachine-server.herokuapp.com/signin', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('일치하는 정보가 없습니다.');
      }

      const loginUserDataResponse = await response.json();
      const { user, accessToken } = loginUserDataResponse;

      storage.setLocalStorage('userInfo', user);
      storage.setLocalStorage('accessToken', accessToken);
    } catch (e) {
      alert(e.message);
    }

    // 메인 페이지 전환 로직
    // nav 탭 표시
  }

  logout() {}

  async editProfile(userInfo) {
    try {
      const { userName: editedName, password, passwordConfirm } = userInfo;

      if (password !== passwordConfirm) {
        throw new Error('비밀번호가 일치하지 않습니다.');
      }

      const userId = storage.getUserInfo().id;
      const accessToken = storage.getAccessToken();

      const response = await fetch(`https://js-vendingmachine-server.herokuapp.com/users/${userId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          password,
          userName: editedName,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseData = await response.json();
      const { email, userName, id } = responseData;
      storage.setLocalStorage('userInfo', { email, userName, id });
    } catch (e) {
      alert(e.message);
    }
  }
}

export default Auth;
