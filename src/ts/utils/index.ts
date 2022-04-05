import { API } from '../../apis';
import type { UserInfoWithPassWord } from '../../apis';
import { $ } from './dom';

const getRandomIndex = <T>(array: T[]) => {
  return Math.floor(Math.random() * array.length);
};

const insertNBSP = (str: string) => {
  return str.replace(/\s+/g, '&nbsp;');
};

const removeNBSP = (str: string) => {
  return str.replace(String.fromCharCode(160), ' ');
};

const getCookie = (name: string) => {
  const matches = document.cookie.match(
    new RegExp(
      `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`,
    ),
  );

  return matches && decodeURIComponent(matches[1]);
};

const getUser = async (): Promise<UserInfoWithPassWord | string> => {
  const userId = getCookie('user_id');
  const accessToken = getCookie('access_token');

  if (!(userId && accessToken)) {
    return 'not Login';
  }

  const user = await API.fetchUser(userId, accessToken);

  return user;
};

const snackBarMaker = () => {
  let timer;

  return (message: string) => {
    if (timer) return;

    const $snackBar = document.createElement('div');
    $snackBar.setAttribute('class', 'snack-bar');
    $snackBar.innerText = message;
    document.body.appendChild($snackBar);

    timer = setTimeout(() => {
      $snackBar.remove();
      timer = undefined;
    }, 3000);
  };
};

export {
  getRandomIndex,
  insertNBSP,
  removeNBSP,
  getCookie,
  getUser,
  snackBarMaker,
};
