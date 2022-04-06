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

export type { UserInfo, LoginInfo, UserInfoWithPassWord, SignupInfo };
