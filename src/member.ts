import Router from './router';
import { showSnack } from './utils';

export async function login(email: BodyInit, password: BodyInit) {
  if (!email) {
    showSnack('이메일을 입력해주세요.');
    return;
  }
  if (!password) {
    showSnack('비밀번호를 입력해주세요.');
    return;
  }

  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const info = await response.json();

  if (!response.ok) {
    alert(info);
    return;
  }

  const user = {
    key: info.accessToken,
    id: info.user.id,
    name: info.user.name,
  };

  localStorage.setItem('user-info', JSON.stringify(user));
  showSnack('로그인 완료');
  Router.pushState('/');
}

export async function signUp(email: string, name: string, password: string) {
  const response = await fetch('http://localhost:3000/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  const info = await response.json();

  if (!response.ok) {
    alert(info);
    return;
  }
  showSnack('가입이 완료되었습니다.');
  Router.pushState('/');
}
