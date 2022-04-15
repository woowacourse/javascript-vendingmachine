type UserResponse = {
  email: string;
  password: string;
  name: string;
  id: number;
};

export interface EditUserInfo {
  user: UserResponse;
  accessToken: string;
}

export interface SignInUserInfo {
  email: string;
  password: string;
}

export interface RegisterUserInfo extends SignInUserInfo {
  name: string;
}
