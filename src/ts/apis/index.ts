import { AuthenticationInfo, User } from '../types';
import { request } from '../utils';

export const requestRegister = (
  registerInfo: AuthenticationInfo
): Promise<{
  accessToken: string;
  user: User;
}> => {
  return request(`${API_HOST}/register`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      email: registerInfo.email,
      password: registerInfo.password,
      name: registerInfo.name,
    }),
  });
};

export const requestLogin = (
  loginInfo: AuthenticationInfo
): Promise<{
  accessToken: string;
  user: User;
}> => {
  return request(`${API_HOST}/login`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      email: loginInfo.email,
      password: loginInfo.password,
    }),
  });
};

export const requestEditUserInfo = (
  editedUserInfo: AuthenticationInfo,
  userId: number,
  accessToken: string
): Promise<User> => {
  return request(`${API_HOST}/600/users/${userId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'PUT',
    body: JSON.stringify({
      email: editedUserInfo.email,
      password: editedUserInfo.password,
      name: editedUserInfo.name,
    }),
  });
};
