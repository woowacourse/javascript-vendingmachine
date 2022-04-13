import { AuthenticationInfo, UserStoreInterface, Hash, ViewInterface } from '../types';
import { generateUserInfoTemplate } from '../template/authenticationTemplate';
import { requestRegister } from '../apis';
import { selectDom, selectDoms } from '../utils';
import Snackbar from '../utils/snackbar';
import { ID, CLASS } from '../constant/selector';
import HASH from '../constant/hash';
import { REGISTER_SUCCESS_MESSAGE } from '../constant/message';

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
    this.content.insertAdjacentHTML('afterbegin', generateUserInfoTemplate());
    this.content.classList.add('auth-content');
    this.content.classList.remove('tab-content');

    this.registerForm = selectDom(`#${ID.USER_INFO_FORM}`);
    this.registerInputs = selectDoms(`.${CLASS.AUTHENTICATION_INPUT}`);

    this.bindEvent();
  }

  bindEvent(): void {
    this.registerForm.addEventListener('submit', this.onSubmitRegisterForm);
  }

  private changeHashUrl(hash: Hash): void {
    window.history.pushState({ hash }, null, hash);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }

  private onSubmitRegisterForm = async (e: SubmitEvent) => {
    e.preventDefault();

    const registerInfo: AuthenticationInfo = this.convertToRegisterInfoObject(
      Array.from(this.registerInputs)
    );

    try {
      this.userStore.validateUserInfoInput(registerInfo);
      await requestRegister(registerInfo);
    } catch (error) {
      Snackbar.show(error.message);
      return;
    }

    this.changeHashUrl(HASH.LOGIN);
    Snackbar.show(REGISTER_SUCCESS_MESSAGE);
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
