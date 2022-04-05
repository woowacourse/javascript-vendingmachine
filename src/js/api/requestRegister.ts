import { RegisterUser } from '../interfaces/UserData.interface';

const requestRegister = async (userData: RegisterUser) => {
  const response = await fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorMessage = await response.json();
    switch (errorMessage) {
      case 'Password is too short':
        throw new Error('비밀번호가 너무 짧습니다.');
      case 'Email already exists':
        throw new Error('중복된 이메일 주소입니다.');
    }
  }

  return '회원가입이 완료되었습니다.';
};

export default requestRegister;
