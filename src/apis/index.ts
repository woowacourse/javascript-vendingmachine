interface LoginInfo {
  email: `${string}@${string}.${string}`;
  password: string;
}

interface UserInfo {
  email: `${string}@${string}.${string}`;
  id: number;
  name: string;
}

interface UserInfoWithPassWord extends UserInfo {
  password: string;
}

type UserResponse =
  | {
      user: UserInfo;
      accessToken: string;
    }
  | string;

interface SignupInfo extends LoginInfo {
  name: string;
}

const baseUrl = 'http://localhost:3000' as const;

async function getUser(
  userId: number,
  accessToken: string,
): Promise<UserInfoWithPassWord> {
  const response = await fetch(`${baseUrl}/600/users/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

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

  const data: UserResponse = await response.json();

  return data;
}

export const API = {
  getUser,
  login,
  signup,
};
