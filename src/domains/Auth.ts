import Domain from '../core/Domain';
import { SERVER } from '../configs/api';
import { REDICTION } from '../configs/constants';

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};
type SignupInfo = Omit<User, 'id'>;
type LoginInfo = Omit<User, 'id' | 'name'>;
type UserBody = {
  accessToken: string;
  user: Partial<User>;
};
type AuthState = {
  [K in keyof UserBody]: UserBody[K] | null;
};

const request = async <T>(
  url: RequestInfo,
  option: RequestInit
): Promise<T> => {
  const res = await fetch(url, option);
  const body = (await res.json()) as T | string;

  if (!res.ok) throw Error(body as string);

  return body as T;
};

class Auth extends Domain<AuthState> {
  async signup(newUser: SignupInfo): Promise<void> {
    const body = await request<UserBody>(`${SERVER}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    this.state.accessToken = body.accessToken;
    this.state.user = body.user;
  }

  async login(loginInfo: LoginInfo): Promise<void> {
    const body = await request<UserBody>(`${SERVER}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginInfo),
    });

    this.state.accessToken = body.accessToken;
    this.state.user = body.user;
  }

  logout(): void {
    this.state.accessToken = null;
    this.state.user = null;
  }

  async updateProfile(updatedProfile: Partial<SignupInfo>): Promise<void> {
    const { accessToken, user } = this.state;

    const body = await request<User>(`${SERVER}/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(updatedProfile),
    });

    this.state.user = {
      ...this.state.user,
      id: body.id,
      email: body.email,
      name: body.name,
    };
  }

  authRoute(loginRequired: boolean | null) {
    const isLoggedIn = Boolean(this.state.accessToken);

    if (isLoggedIn && loginRequired === false) {
      return REDICTION.LANDING;
    }

    if (!isLoggedIn && loginRequired) {
      return REDICTION.LOGIN;
    }

    return REDICTION.AUTHORIZED;
  }
}

export const auth = new Auth({ user: null, accessToken: null });
