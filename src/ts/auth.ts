export const isUserLoggedIn = () => document.cookie;

export const getCurrentUser = () => {
  const [accessToken, name, email] = document.cookie
    .split('; ')
    .map((query) => query.split('=')[1]);
  return { accessToken, name, email };
};

export const setCurrentUser = ({ accessToken, name, email }) => {
  document.cookie = `accessToken=${accessToken}`;
  document.cookie = `userName=${name}`;
  document.cookie = `userEmail=${email}`;
};
