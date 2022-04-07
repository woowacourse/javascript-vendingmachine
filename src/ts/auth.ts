export const isUserLoggedIn = () => document.cookie;

export const getCurrentUser = () =>
  document.cookie
    .split('; ')
    .map((query) => query.split('='))
    .reduce(
      (acc, cur) => {
        acc[cur[0]] = cur[1];
        return acc;
      },
      { accessToken: '', id: '', name: '', email: '' }
    );

export const setCurrentUser = ({ accessToken, name, email, id }) => {
  console.log(accessToken, name, email, id);
  document.cookie = `accessToken=${accessToken}`;
  document.cookie = `name=${name}`;
  document.cookie = `email=${email}`;
  document.cookie = `id=${id}`;
};

export const deleteCurrentUser = () => {
  document.cookie =
    'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = 'name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = 'email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = 'id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};
