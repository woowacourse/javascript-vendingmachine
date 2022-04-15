import { requestLogin, requestProfileEdit, requestRegister, requestUserInfo } from 'Api';
import { USER_SESSION_SETTING } from 'Constants';
import { getCookie, getTimeStamp, removeCookies, setCookie } from 'Utils';
import Store from './Abstract';

class UserSessionStore extends Store {
  protected state = {
    userSession: {
      isLoggedIn: false,
      key: -1,
      email: '',
      name: '',
      expire: 0,
    },
    userSessionEvent: {
      isDone: false,
      isError: false,
      message: '',
    },
  };

  constructor() {
    super();

    const accessToken: string = getCookie(USER_SESSION_SETTING.TOKEN_COOKIE_NAME);
    if (accessToken) this.loadUserInfoCache();
  }

  private loadUserInfoCache(): void {
    const cachedUserSession = localStorage.getItem(USER_SESSION_SETTING.USER_INFO_STORAGE_NAME);
    cachedUserSession &&
      this.setState({
        userSession: JSON.parse(cachedUserSession),
      });
  }

  private isExpireSession() {
    if (this.state.userSession.expire > getTimeStamp()) {
      return false;
    }

    this.logout();
    return true;
  }

  public isLogin(): boolean {
    const { isLoggedIn } = this.state.userSession;

    if (isLoggedIn === true && this.isExpireSession() === true) return false;
    if (isLoggedIn === false) return false;

    return true;
  }

  public initSessionEvent() {
    this.setState({
      userSessionEvent: {
        isDone: false,
        isError: false,
        message: '',
      },
    });
  }

  private errorMessageSend(message: string) {
    this.setState({
      userSessionEvent: {
        isDone: false,
        isError: true,
        message,
      },
    });
  }

  private updateSessionCache(accessToken: string, expireSecond = USER_SESSION_SETTING.EXPIRE_TIME) {
    setCookie(USER_SESSION_SETTING.TOKEN_COOKIE_NAME, accessToken, expireSecond);

    const { userSession } = this.state;
    localStorage.setItem(USER_SESSION_SETTING.USER_INFO_STORAGE_NAME, JSON.stringify(userSession));
  }

  private removeSessionCache() {
    removeCookies(USER_SESSION_SETTING.TOKEN_COOKIE_NAME);
    localStorage.removeItem(USER_SESSION_SETTING.USER_INFO_STORAGE_NAME);
  }

  public async login(email: string, password: string): Promise<void> {
    const { status, content }: IRequest = await requestLogin(email, password);

    if (status === 'fail') {
      this.errorMessageSend(content);
      return;
    }

    const { accessToken, user } = content;
    this.setState({
      userSession: {
        isLoggedIn: true,
        key: user.id,
        email: user.email,
        name: user.name,
        expire: getTimeStamp() + USER_SESSION_SETTING.EXPIRE_TIME,
      },
      userSessionEvent: {
        isDone: true,
        isError: false,
        message: '',
      },
    });
    this.updateSessionCache(accessToken);
  }

  public logout(): void {
    this.removeSessionCache();
    this.setState({
      userSession: {
        isLoggedIn: false,
        key: -1,
        email: '',
        name: '',
        expire: 0,
      },
      userSessionEvent: {
        isDone: false,
        isError: false,
        message: '',
      },
    });
  }

  async register(email: string, name: string, password: string): Promise<void> {
    const { status, content }: IRequest = await requestRegister(email, name, password);

    if (status === 'fail') {
      this.errorMessageSend(content);
      return;
    }

    const { accessToken, user } = content;
    this.setState({
      userSession: {
        isLoggedIn: true,
        key: user.id,
        email: user.email,
        name: user.name,
        expire: getTimeStamp() + USER_SESSION_SETTING.EXPIRE_TIME,
      },
      userSessionEvent: {
        isDone: true,
        isError: false,
        message: '',
      },
    });
    this.updateSessionCache(accessToken);
  }

  async profileChange(name: string, password: string): Promise<void> {
    const userKey = this.state.userSession.key;
    const { status, content }: IRequest = await requestProfileEdit(userKey, name, password);

    if (status === 'fail') {
      this.errorMessageSend(content);
      return;
    }

    const updateUserInfo = { ...this.state.userSession };
    updateUserInfo.name = content.name;

    this.setState({
      userSession: updateUserInfo,
      userSessionEvent: {
        isDone: true,
        isError: false,
        message: '',
      },
    });
  }
}

export default new UserSessionStore();
