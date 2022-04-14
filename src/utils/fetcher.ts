import { SERVER_URL } from '../constants/auth';
/*
export const getUser

fetch(`${SERVER_URL}/signin`, {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    if (res.ok) {
      res.json().then((data) => {
        const userInfo = data.user;
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
        this.app.dispatchEvent(new CustomEvent('signInOk'));
      });
    }
    if (!res.ok) {
      this.snackBar.render('올바른 이메일과 비밀번호를 입력해주세요');
    }
  });*/
