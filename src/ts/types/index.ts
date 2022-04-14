type Inputs<T> = {
  [infoType in keyof T]: HTMLInputElement;
};

interface UserInfo {
  email: string;
  id: string;
  name: string;
}

interface LoginInfo {
  email: string;
  password: string;
}

interface UserInfoWithPassWord extends UserInfo {
  password: string;
}

interface SignupInfo extends LoginInfo {
  name: string;
}

export type { Inputs, UserInfo, LoginInfo, UserInfoWithPassWord, SignupInfo };
