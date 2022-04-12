import { User } from './UserData.interface';

interface LoginSuccess {
  accessToken: string;
  user: User;
}

export type { LoginSuccess };
