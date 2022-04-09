import { validateData } from '../vendingMachine/validator';
import Snackbar from '../../view/SnackBar';
import { ERROR, STORAGE_KEY } from '../../constants';
import {
  hasBlank,
  isDifferent,
  isEmpty,
  isInValidPassword,
  isNameLengthOutOfRange,
  isUnderMinLengthPassword,
} from './validator';

const emailValidator = [
  { testFunc: isEmpty, errorMsg: '이메일을 입력해주세요.' },
  { testFunc: hasBlank, errorMsg: '이메일은 공백을 포함할 수 없습니다.' },
];

const nameValidator = [
  { testFunc: isEmpty, errorMsg: '이름을 입력해주세요.' },
  { testFunc: hasBlank, errorMsg: '이름은 공백을 포함할 수 없습니다.' },
  {
    testFunc: isNameLengthOutOfRange,
    errorMsg: '이름은 2자 미만이거나 6자를 초과할 수 없습니다.',
  },
];

const passwordValidator = [
  { testFunc: isEmpty, errorMsg: '비밀번호를 입력해주세요.' },
  { testFunc: hasBlank, errorMsg: '비밀번호는 공백을 포함할 수 없습니다.' },
  {
    testFunc: isUnderMinLengthPassword,
    errorMsg: '비밀번호는 10자 미만일 수 없습니다.',
  },
  {
    testFunc: isInValidPassword,
    errorMsg: '비밀번호는 소문자, 대문자, 숫자, 특수문자 중 2가지를 혼합해야 합니다.',
  },
];

const passwordConfirmValidator = [
  { testFunc: isEmpty, errorMsg: '비밀번호 확인을 입력해주세요.' },
  { testFunc: hasBlank, errorMsg: '비밀번호 확인은 공백을 포함할 수 없습니다.' },
];

function validateUserInfo(userInfo) {
  const { email, name, password, passwordConfirm } = userInfo;

  validateData(email, emailValidator);
  validateData(name, nameValidator);
  validateData(password, passwordValidator);
  validateData(passwordConfirm, passwordConfirmValidator);

  if (isDifferent(password, passwordConfirm)) {
    throw Error('비밀번호와 비밀번호 확인이 일치해야 합니다.');
  }
}

const Auth = {
  register(userInfo) {
    validateUserInfo(userInfo);
    this.loadRegisterAPI(userInfo);
  },
  login(userInfo) {
    this.loadLoginAPI(userInfo);
  },
  async getUserInfo(id) {
    return this.loadUserInfoAPI(id);
  },
  modify(userId, userInfo) {
    validateUserInfo(userInfo);

    this.loadModifyAPI(userId, userInfo);
  },
  async loadUserInfoAPI(id) {
    const response = await fetch(`http://localhost:3000/users/${id}`).then((res) =>
      res.json()
    );
    return response;
  },
  async loadLoginAPI(userInfo) {
    const { email, password } = userInfo;
    const payload = JSON.stringify({ email, password });

    try {
      const response = await fetch('http://localhost:3000/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
      }).then((res) => res.json());

      if (typeof response === 'string') {
        throw Error(response);
      }

      const {
        accessToken,
        user: { id },
      } = response;

      localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, accessToken);
      localStorage.setItem(STORAGE_KEY.USER_ID, id);
      window.location.href = '#/manage';
    } catch (error) {
      Snackbar.dispatch(error, ERROR);
    }
  },

  async loadRegisterAPI(userInfo) {
    const { email, name, password } = userInfo;
    const payload = JSON.stringify({ email, name, password });

    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
      }).then((res) => res.json());

      if (typeof response === 'string') {
        throw Error(response);
      }

      window.location.href = '#/login';
    } catch (error) {
      Snackbar.dispatch(error, ERROR);
    }
  },
  async loadModifyAPI(id, userInfo) {
    const { email, name, password } = userInfo;
    const payload = JSON.stringify({ email, name, password });

    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
      }).then((res) => res.json());

      if (typeof response === 'string') {
        throw Error(response);
      }
      window.location.href = '#/purchase';
    } catch (error) {
      Snackbar.dispatch(error, ERROR);
    }
  },
};

export default Auth;
