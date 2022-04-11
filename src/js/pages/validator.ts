const isPositiveName = (name: string) => name.length >= 2 && name.length <= 6;

const isPositivePwdLength = (pwd: string) => pwd.length >= 8;

const isPwdLowerCase = (pwd: string) => pwd.search(/[a-z]/) >= 0;

const isPwdUpperCase = (pwd: string) => pwd.search(/[A-Z]/) >= 0;

const isPwdSpecialChar = (pwd: string) => pwd.search(/[#?!@$%^&*-]/) >= 0;

const isPwdDigit = (pwd: string) => pwd.search(/[0-9]/) >= 0;

const isSamePwdCheck = (pwd: string, pwdCheck: string) => pwd === pwdCheck;

export {
  isPositiveName,
  isPositivePwdLength,
  isPwdLowerCase,
  isPwdUpperCase,
  isPwdSpecialChar,
  isPwdDigit,
  isSamePwdCheck,
};
