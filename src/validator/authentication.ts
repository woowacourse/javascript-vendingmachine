const signupValidator = {
  isInsufficientPassword(password: string) {
    return !/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/.test(password);
  },

  isWrongPassword(password: string, passwordConfirm: string) {
    return password !== passwordConfirm;
  },
};

export const validateSignup = (userName: string, password: string, passwordConfirm: string) => {
  if (signupValidator.isInsufficientPassword(password)) {
    throw new Error('비밀번호는 숫자와 영문자 조합으로 8글자 이상, 20글자 이하를 입력해주세요.');
  }

  if (signupValidator.isWrongPassword(password, passwordConfirm)) {
    throw new Error('비밀번호와 비밀번호 확인란이 일치하지 않습니다.');
  }
};
