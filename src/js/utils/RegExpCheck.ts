export const checkPasswordValidation = (password: string) => {
  const regExp = /^(?=.*[!@#$%^&*()_+=|<>?:{}]{0,20})(?=.*[a-zA-Z])(?=.*[0-9]).{6,20}/i;
  return regExp.test(password);
};

export const checkEmailValidation = function (email: string) {
  const regExp =
    /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/i;
  return regExp.test(email);
};
