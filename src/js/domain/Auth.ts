import { validateData } from './validator';
import Snackbar from '../view/SnackBar';

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

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('userId', id);

      window.location.href = '#/manage';
    } catch (error) {
      Snackbar.dispatch(error, 'fail');
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
      Snackbar.dispatch(error, 'fail');
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
      Snackbar.dispatch(error, 'fail');
    }
  },
};

function isUnderMinLengthPassword(password) {
  return password.length < 10;
}

function isNameLengthOutOfRange(value) {
  return value.length < 2 || value.length > 6;
}

function isDifferent(valueA, valueB) {
  return valueA !== valueB;
}

function isEmpty(value) {
  return value === '';
}

function hasBlank(value) {
  return value.includes(' ');
}

function isInValidPassword(password) {
  const testFuncs = [isSpecialCase, isUpperCase, isLowerCase, isNumber];

  for (let value of password.split('')) {
    for (let index in testFuncs) {
      if (testFuncs[index](value)) {
        testFuncs.splice(Number(index), 1);
        break;
      }
    }
    if (testFuncs.length <= 2) return false;
  }

  return true;
}

function isSpecialCase(value) {
  const special = ['!', '@', '#', '$', '%', '^', '&', '* '];

  return special.includes(value);
}

function isUpperCase(value) {
  const code = value.charCodeAt(0);

  return code >= 65 && code <= 90;
}

function isLowerCase(value) {
  const code = value.charCodeAt(0);

  return code >= 97 && code <= 122;
}

function isNumber(value) {
  const code = value.charCodeAt(0);

  return code >= 48 && code <= 57;
}

export default Auth;
