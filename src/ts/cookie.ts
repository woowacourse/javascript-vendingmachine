export const getCookiesObject = (): any =>
  document.cookie
    .split('; ')
    .map((query) => query.split('='))
    .reduce((acc, cur) => {
      acc[cur[0]] = cur[1];
      return acc;
    }, {});

export const setCookies = (object): void => {
  console.log(object);
  // document.cookie = `accessToken=${accessToken}`;
  // document.cookie = `name=${name}`;
  // document.cookie = `email=${email}`;
  // document.cookie = `id=${id}`;
};
