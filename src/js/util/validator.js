export const isValidName = (name) => name.length <= 6 && name.length >= 2;

export const isValidPassword = (password) =>
  password.match(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
  );
