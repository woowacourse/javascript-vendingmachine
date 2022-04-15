export interface SignUpResponse {
  accessToken: string;
  user: {
    name: string;
    email: string;
    id: number;
  };
}

export interface UserInfoResponse {
  name: string;
  email: string;
  password: string;
  id: number;
}
