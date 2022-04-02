interface UserInfo {
  email: string;
  password: string;
  name? :string;
}

const signUpURL = 'http://localhost:3000/signup/';
const loginURL = 'http://localhost:3000/login/';

function signUp(signUpInfo: UserInfo) {
  fetch(signUpURL, {
    method: 'POST',
    body: JSON.stringify(signUpInfo),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => {
    if (!res.ok) {
      throw new Error('회원가입 오류');
    }
    return res.json();
  })
    .then(response => {
      const userAuth = {
        accessToken: response.accessToken,
        id: response.user.id,
      };
      localStorage.setItem('userAuth', JSON.stringify(userAuth));
    })
    .catch(error => console.error('에러', error));
}

function login(loginInfo: UserInfo) {
  fetch(loginURL, {
    method: 'POST',
    body: JSON.stringify(loginInfo),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => {
    if (!res.ok) {
      throw new Error('로그인 정보 오류');
    }
    return res.json();
  })
    .then(response => {
      const userAuth = {
        accessToken: response.accessToken,
        id: response.user.id,
      };
      localStorage.setItem('userAuth', JSON.stringify(userAuth));
      location.replace('../');
    })
    .catch(error => console.error('에러', error));
}

export {
  signUp,
  login,
};
