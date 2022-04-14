const validateNameLength = (name: string) => name.length >= 2 && name.length <= 6;

const validatePwdLength = (pwd: string) => pwd.length >= 8;

const validatePwdLowerCase = (pwd: string) => pwd.search(/[a-z]/) >= 0;

const validatePwdUpperCase = (pwd: string) => pwd.search(/[A-Z]/) >= 0;

const validatePwdSpecialChar = (pwd: string) => pwd.search(/[#?!@$%^&*-]/) >= 0;

const validatePwdDigit = (pwd: string) => pwd.search(/[0-9]/) >= 0;

const validateSamePwdCheck = (pwd: string, pwdCheck: string) => pwd === pwdCheck;

const validateAccount = (name: string, pwd: string, pwdCheck: string) => {
  return {
    validateNameLength: validateNameLength(name),
    validatePwdLength: validatePwdLength(pwd),
    validatePwdLowerCase: validatePwdLowerCase(pwd),
    validatePwdUpperCase: validatePwdUpperCase(pwd),
    validatePwdSpecialChar: validatePwdSpecialChar(pwd),
    validatePwdDigit: validatePwdDigit(pwd),
    validateSamePwdCheck: validateSamePwdCheck(pwd, pwdCheck),
  };
};

export { validateAccount };
