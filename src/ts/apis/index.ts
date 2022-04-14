import type {
  LoginInfo,
  SignupInfo,
  UserInfo,
  UserInfoWithPassWord,
} from '../types';

type UserResponse = {
  user: UserInfo;
  accessToken: string;
};

export const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://json-server-tests-api-mockup.herokuapp.com'
    : 'http://localhost:3000';

async function fetchUser(
  userId: string,
  accessToken: string,
): Promise<UserInfoWithPassWord> {
  const response = await fetch(`${baseUrl}/600/users/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) throw new Error('로그인 되지 않았습니다.');

  const data: UserInfoWithPassWord = await response.json();

  return data;
}

async function login(loginInfo: LoginInfo): Promise<UserResponse> {
  const { email, password } = loginInfo;
  const response = await fetch(`${baseUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) throw new Error('로그인 실패했습니다.');

  const data: UserResponse = await response.json();

  return data;
}

async function signup(signupInfo: SignupInfo): Promise<UserResponse> {
  const { email, password, name } = signupInfo;
  const response = await fetch(`${baseUrl}/register`, {
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

  if (!response.ok) throw new Error('회원가입 실패했습니다.');

  const data: UserResponse = await response.json();

  return data;
}

async function editInfo(
  userInfoWithPassWord: UserInfoWithPassWord,
): Promise<UserResponse> {
  const { email, password, name, id } = userInfoWithPassWord;
  const response = await fetch(`${baseUrl}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  if (!response.ok) throw new Error('회원정보 수정 실패했습니다.');

  const data: UserResponse = await response.json();

  return data;
}

export const API = {
  fetchUser,
  login,
  signup,
  editInfo,
};
