export const checkValidSignUpName = (name: string): void | never => {
  if (name.length < 2 || name.length > 6) {
    throw new Error('이름은 2글자 ~ 6글자까지 입력 하실 수 있습니다.');
  }
};

export const checkValidSignUpPassword = (
  password: string,
  passwordConfirm: string
): void | never => {
  // 8 ~ 16자 영문 + 숫자 조합 정규식
  const passWordRegExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;
  if (!passWordRegExp.test(password)) {
    throw new Error('비밀번호 정규식 규칙 위반!!');
  }

  if (password !== passwordConfirm) {
    throw new Error(
      '비밀번호와 비밀번호 확인이 일치하지 않습니다. 비밀번호를 확인 후 다시 입력해주세요.'
    );
  }
};

export const checkValidSignUpEmail = (email: string) => {
  // 올바른 이메일 형식인지 확인하는 정규식
  const emailRegExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  if (!emailRegExp.test(email)) {
    throw new Error('이메일 형식 오류');
  }
};
