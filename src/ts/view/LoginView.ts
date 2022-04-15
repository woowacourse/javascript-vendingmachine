import { AuthenticationInfo, UserStoreInterface, Hash, ViewInterface } from '../types';
import { generateLoginTemplate } from '../template/authenticationTemplate';
import { requestLogin } from '../apis';
import { selectDom, selectDoms } from '../utils';
import Snackbar from '../utils/snackbar';
import { setCookie } from '../utils/cookie';
import { ID, CLASS } from '../constant/selector';
import HASH from '../constant/hash';
import { COOKIE_KEY } from '../constant/cookie';
import { LOGIN_SUCCESS_MESSAGE } from '../constant/message';

class LoginView implements ViewInterface {
  userStore: UserStoreInterface;

  tabHash: Hash;

  content: HTMLElement | null = selectDom(`#${ID.CONTENT}`);

  loginForm: HTMLFormElement | null = null;

  loginInputs: NodeListOf<HTMLInputElement> | null = null;

  constructor(userStore: UserStoreInterface, tabHash: Hash) {
    this.userStore = userStore;
    this.tabHash = tabHash;
  }

  render(): void {
    this.content.replaceChildren();
    this.content.insertAdjacentHTML('afterbegin', generateLoginTemplate());

    this.loginForm = selectDom(`#${ID.LOGIN_FORM}`);
    this.loginInputs = selectDoms(`.${CLASS.AUTHENTICATION_INPUT}`);

    this.content.classList.add('auth-content');
    this.content.classList.remove('tab-content');

    this.bindEvent();
  }

  bindEvent(): void {
    this.loginForm.addEventListener('submit', this.onSubmitLoginForm);
  }

  private changeHashUrl(hash: Hash): void {
    window.history.pushState({ hash }, null, hash);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }

  private onSubmitLoginForm = async (e: SubmitEvent) => {
    e.preventDefault();

    const logInfo: AuthenticationInfo = this.convertToLoginInfoObject(Array.from(this.loginInputs));

    try {
      this.userStore.validateLoginInput(logInfo);
      const { accessToken, user } = await requestLogin(logInfo);

      this.userStore.setUserInfo({ accessToken, ...user });
      setCookie(COOKIE_KEY.USER_INFO, JSON.stringify({ accessToken, ...user }));
    } catch (error) {
      Snackbar.show(error.message);
      return;
    }

    this.changeHashUrl(HASH.ITEM_PURCHASE);
    Snackbar.show(LOGIN_SUCCESS_MESSAGE);
  };

  private convertToLoginInfoObject(loginInputList: HTMLInputElement[]): AuthenticationInfo {
    const [email, password] = loginInputList.map((registerInput) => registerInput.value);

    return {
      email,
      password,
    };
  }
}

export default LoginView;
