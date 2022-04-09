export const isOutOfNameRange = name => {
  return name.length < 2 || name.length > 6;
};

export const isInValidPassword = password => {
  const regExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return password.match(regExp) === null;
};

export const checkJoinPossible = (name, password, passwordReenter) => {
  if (isOutOfNameRange(name)) {
    throw new Error('이름은 2자~6자 입니다.');
  }
  if (isInValidPassword(password)) {
    throw new Error('비밀번호는 문자와 숫자 포함 8자 이상이어야 합니다.');
  }
  if (password !== passwordReenter) {
    throw new Error('다시 입력한 비밀번호가 일치하지 않습니다.');
  }
  return true;
};
