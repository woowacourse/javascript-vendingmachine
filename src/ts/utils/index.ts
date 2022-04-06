import { API } from '../../apis';
import type { Inputs, UserInfoWithPassWord } from '../types';

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
  let timer: NodeJS.Timeout;
  let $snackBar: HTMLDivElement;

  return (message: string) => {
    if (timer) {
      if ($snackBar.innerText !== message) {
        $snackBar.innerText = message;
        clearTimeout(timer);
        timer = setTimeout(() => {
          $snackBar.remove();
          timer = undefined;
        }, 3000);
      }
      return;
    }

    $snackBar = document.createElement('div');
    $snackBar.setAttribute('class', 'snack-bar');
    $snackBar.innerText = message;
    document.body.appendChild($snackBar);

    timer = setTimeout(() => {
      $snackBar.remove();
      timer = undefined;
    }, 3000);
  };
};

const showSnackbar = snackBarMaker();

function focusOnInvalidInput<T>(target: keyof T, $inputs: Inputs<T>) {
  const keys = Object.keys($inputs);
  keys.forEach(key => {
    if (target === key) {
      $inputs[key].focus();
    }
  });
}

export {
  getRandomIndex,
  insertNBSP,
  removeNBSP,
  getCookie,
  getUser,
  snackBarMaker,
  showSnackbar,
  focusOnInvalidInput,
};
