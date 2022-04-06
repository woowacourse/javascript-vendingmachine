import { AuthenticationInfo, UserStoreInterface, Hash, ViewInterface, UserInfo } from '../types';
import { generateUserInfoTemplate } from '../template/authenticationTemplate';
import { selectDom, selectDoms } from '../utils';
import { ID, CLASS } from '../constant/selector';
import HASH from '../constant/hash';

class UserInfoEditView implements ViewInterface {
  userStore: UserStoreInterface;

  tabHash: Hash;

  content: HTMLElement | null = selectDom(`#${ID.CONTENT}`);

  userInfoForm: HTMLFormElement | null = null;

  userInfoInputs: NodeListOf<HTMLInputElement> | null = null;

  constructor(userStore: UserStoreInterface, tabHash: Hash) {
    this.userStore = userStore;
    this.tabHash = tabHash;
  }

  render(): void {
    const userStore: UserInfo = this.userStore.getUserInfo();

    this.content.replaceChildren();
    this.content.insertAdjacentHTML('afterbegin', generateUserInfoTemplate(userStore.email, true));
    this.content.classList.add('auth-content');
    this.content.classList.remove('tab-content');

    this.userInfoForm = selectDom(`#${ID.USER_INFO_FORM}`);
    this.userInfoInputs = selectDoms(`.${CLASS.AUTHENTICATION_INPUT}`);

    this.bindEvent();
  }

  bindEvent(): void {
    this.userInfoForm.addEventListener('submit', this.onSubmitUserInfoForm);
  }

  changeHashUrl(hash: Hash): void {
    window.history.pushState({ hash }, null, hash);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }

  private onSubmitUserInfoForm = async (e: SubmitEvent) => {
    e.preventDefault();

    const userInfo: AuthenticationInfo = this.convertToUserInfoObject(
      Array.from(this.userInfoInputs)
    );

    try {
      this.userStore.validateUserInfoInput(userInfo);
      await this.userStore.editUserInfo(userInfo);
    } catch (error) {
      window.alert(error.message);
      return;
    }

    // TODO: 스낵바로 회원가입에 성공했다는 사실을 알려주기
    this.changeHashUrl('/' as Hash);
  };

  private convertToUserInfoObject(userInfoInputList: HTMLInputElement[]): AuthenticationInfo {
    const [email, name, password, verificationPassword] = userInfoInputList.map(
      (userInfoInput) => userInfoInput.value
    );

    return {
      email,
      name,
      password,
      verificationPassword,
    };
  }
}

export default UserInfoEditView;
