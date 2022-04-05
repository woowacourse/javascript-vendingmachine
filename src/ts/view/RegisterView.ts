import { AuthenticationInfo, UserStoreInterface, Hash, ViewInterface } from '../types';
import { generateRegisterTemplate } from '../template/authenticationTemplate';
import { selectDom, selectDoms } from '../utils';
import { ID, CLASS } from '../constant/selector';
import HASH from '../constant/hash';

class RegisterView implements ViewInterface {
  userStore: UserStoreInterface;

  tabHash: Hash;

  content: HTMLElement | null = selectDom(`#${ID.CONTENT}`);

  registerForm: HTMLFormElement | null = null;

  registerInputs: NodeListOf<HTMLInputElement> | null = null;

  constructor(userStore: UserStoreInterface, tabHash: Hash) {
    this.userStore = userStore;
    this.tabHash = tabHash;
  }

  render(): void {
    this.content.replaceChildren();
    this.content.insertAdjacentHTML('afterbegin', generateRegisterTemplate());
    this.content.classList.add('auth-content');
    this.content.classList.remove('tab-content');

    this.registerForm = selectDom(`#${ID.REGISTER_FORM}`);
    this.registerInputs = selectDoms(`.${CLASS.AUTHENTICATION_INPUT}`);

    this.bindEvent();
  }

  bindEvent(): void {
    this.registerForm.addEventListener('submit', this.onSubmitRegisterForm);
  }

  changeHashUrl(hash: Hash): void {
    window.history.pushState({ hash }, null, hash);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }

  private onSubmitRegisterForm = async (e: SubmitEvent) => {
    e.preventDefault();

    const registerInfo: AuthenticationInfo = this.convertToRegisterInfoObject(
      Array.from(this.registerInputs)
    );

    try {
      this.userStore.validateRegisterInput(registerInfo);
      await this.userStore.register(registerInfo);
    } catch (error) {
      window.alert(error.message);
      return;
    }

    // TODO: 스낵바로 회원가입에 성공했다는 사실을 알려주기
    this.changeHashUrl(HASH.LOGIN);
  };

  private convertToRegisterInfoObject(registerInputList: HTMLInputElement[]): AuthenticationInfo {
    const [email, name, password, verificationPassword] = registerInputList.map(
      (registerInput) => registerInput.value
    );

    return {
      email,
      name,
      password,
      verificationPassword,
    };
  }
}

export default RegisterView;
