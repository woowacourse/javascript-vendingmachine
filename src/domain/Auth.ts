import { historyRouterPush } from '../router';
import storage from '../storage';
import { on, $, showSnackBar } from '../utils';

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

      // 로그인 페이지 전환 로직 추가
      historyRouterPush('/javascript-vendingmachine/signin');
    } catch (e) {
      showSnackBar(e.message);
    }
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

      // 메인 페이지 전환 로직
      historyRouterPush('/javascript-vendingmachine/');
    } catch (e) {
      showSnackBar(e.message);
    }
  }

  static logout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('accessToken');
  };

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

      // 메인 페이지 전환 로직
      historyRouterPush('/javascript-vendingmachine/');
    } catch (e) {
      showSnackBar(e.message);
    }
  }
}

export default Auth;
