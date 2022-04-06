interface User {
  email: string;
  name: string;
  id: string;
  password: string;
  passwordCheck: string;
}

interface AccessToken {
  email: string;
  iat: number;
  exp: number;
}

export type { User, AccessToken };
