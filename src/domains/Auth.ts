import Domain from '../core/Domain';

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

type SignupInfo = Omit<User, 'id'>;
type LoginInfo = Omit<User, 'id' | 'name'>;
type LoggedUserInfo = Omit<User, 'password'>;

export interface AuthState {
  user: LoggedUserInfo | null;
  accessToken: string | null;
}

export default class Auth extends Domain<AuthState> {
  async signup(newUser: SignupInfo): Promise<void> {
    const res = await fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });
    const body = await res.json();

    if (!res.ok) throw Error(body);

    this.state.accessToken = body.accessToken;
    this.state.user = body.user;
  }

  async login(loginInfo: LoginInfo): Promise<void> {
    const res = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginInfo),
    });
    const body = await res.json();

    if (!res.ok) throw Error(body);

    this.state.accessToken = body.accessToken;
    this.state.user = body.user;
  }

  logout(): void {
    this.state.accessToken = null;
    this.state.user = null;
  }

  async updateProfile(updatedProfile: Partial<SignupInfo>): Promise<void> {
    const { accessToken, user } = this.state;

    const res = await fetch(`http://localhost:5000/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(updatedProfile),
    });
    const body = await res.json();

    if (!res.ok) throw Error(body);

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
      return 'landing';
    }

    if (!isLoggedIn && loginRequired) {
      return 'login';
    }

    return 'authorized';
  }
}

export const auth = new Auth({ user: null, accessToken: null });
