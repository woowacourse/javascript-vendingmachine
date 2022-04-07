const signupValidator = {
  isInsufficientPassword(password: string) {
    return !/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/.test(password);
  },

  isWrongPassword(password: string, passwordConfirm: string) {
    return password !== passwordConfirm;
  },

  isInsufficientName(name: string) {
    return name.length < 2 || name.length > 6;
  },
};

export const validateSignup = (userName: string, password: string, passwordConfirm: string) => {
  if (signupValidator.isInsufficientName(userName)) {
    throw new Error('이름은 2글자 이상, 6글자 이하로 입력해주세요.');
  }

  if (signupValidator.isInsufficientPassword(password)) {
    throw new Error('비밀번호는 숫자와 영문자 조합으로 8글자 이상, 20글자 이하를 입력해주세요.');
  }

  if (signupValidator.isWrongPassword(password, passwordConfirm)) {
    throw new Error('비밀번호와 비밀번호 확인란이 일치하지 않습니다.');
  }
};

const profileEditValidator = {
  isLogin(token: string | null) {
    return !!token;
  },
};

export const validateProfileEdit = (password: string, passwordConfirm: string, token: string | null) => {
  if (signupValidator.isInsufficientPassword(password)) {
    throw new Error('비밀번호는 숫자와 영문자 조합으로 8글자 이상, 20글자 이하를 입력해주세요.');
  }

  if (signupValidator.isWrongPassword(password, passwordConfirm)) {
    throw new Error('비밀번호와 비밀번호 확인란이 일치하지 않습니다.');
  }

  if (!profileEditValidator.isLogin(token)) {
    throw new Error('로그인 유저만 회원정보를 수정할 수 있습니다. 다시 로그인을 해주세요.');
  }
};
