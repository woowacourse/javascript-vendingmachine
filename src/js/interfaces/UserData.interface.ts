interface RegisterUser {
  email: string;
  name: string;
  password: string;
  passwordCheck: string;
}

interface AccessToken {
  email: string;
  iat: number;
  exp: number;
}

export type { RegisterUser, AccessToken };
