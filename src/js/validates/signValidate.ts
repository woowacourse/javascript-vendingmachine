export const signValidate = {
  signUp: ({ email, name, password, confirmPassword }) => {
    if (!checkEmail(email)) {
      throw new Error('잘못된 이메일 형식입니다.');
    }
    if (!checkName(name)) {
      throw new Error('한글과 영문이 혼용되지 않는 2이상 10이하의 이름을 입력해주세요.');
    }
    if (!checkConfirmPassword(password, confirmPassword)) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }
    if (!checkPassword(password)) {
      throw new Error(
        '문자, 숫자, 특수문자가 하나 이상 포함된 8자 이하의 비밀번호를 입력해주세요.'
      );
    }
  },

  editProfile: ({ name, password, confirmPassword }) => {
    if (!checkName(name)) {
      throw new Error('한글과 영문이 혼용되지 않는 2이상 10이하의 이름을 입력해주세요.');
    }
    if (!checkConfirmPassword(password, confirmPassword)) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }
    if (!checkPassword(password)) {
      throw new Error(
        '문자, 숫자, 특수문자가 하나 이상 포함된 8자 이하의 비밀번호를 입력해주세요.'
      );
    }
  },
};

function checkPassword(password) {
  const regularExpression = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
  return regularExpression.test(password);
}

function checkConfirmPassword(password, confirmPassword) {
  return password === confirmPassword;
}

function checkEmail(email) {
  const regularExpression =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  return regularExpression.test(email);
}

function checkName(name) {
  const regularExpression = /^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/;
  return regularExpression.test(name);
}
