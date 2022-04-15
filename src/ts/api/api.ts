import { RegisterUserInfo, SignInUserInfo } from '../types/userInfo';
import { SignUpResponse, UserInfoResponse } from '../types/fetchResponse';

const BASE_URL = 'https://vendingmachine-json-server.herokuapp.com';

const request = async <T>(url: string, option: RequestInit): Promise<T> => {
  const response = await fetch(BASE_URL + url, option);
  const data = await response.json();

  if (!response.ok) throw new Error(data);

  return data;
};

export const requestRegister = async (
  registerUserInfo: RegisterUserInfo
): Promise<SignUpResponse> => {
  const response = await request<SignUpResponse>('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registerUserInfo),
  });

  return response;
};

export const requestSignIn = async (
  signInUserInfo: SignInUserInfo
): Promise<SignUpResponse> => {
  const response = await request<SignUpResponse>('/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(signInUserInfo),
  });

  return response;
};

export const requestUserInfo = async ({
  accessToken,
  id,
}): Promise<UserInfoResponse> => {
  const response = await request<UserInfoResponse>(`/600/users/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};

export const requestEditInformation = async ({
  accessToken,
  user,
}): Promise<UserInfoResponse> => {
  const response = await request<UserInfoResponse>(`/users/${user.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(user),
  });

  return response;
};
