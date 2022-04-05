import { AuthenticationInfo, UserStoreInterface, Hash, ViewInterface } from '../types';
import { generateLoginTemplate } from '../template/authenticationTemplate';
import { selectDom, selectDoms } from '../utils';
import { ID, CLASS } from '../constant/selector';

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

  changeHashUrl(hash: Hash): void {
    window.history.pushState({ hash }, null, hash);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }

  private onSubmitLoginForm = async (e: SubmitEvent) => {
    e.preventDefault();

    const logInfo: AuthenticationInfo = this.convertToLoginInfoObject(Array.from(this.loginInputs));

    try {
      this.userStore.validateLoginInput(logInfo);
      await this.userStore.login(logInfo);
    } catch (error) {
      alert(error.message);
      return;
    }

    window.location.href = '/';
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
