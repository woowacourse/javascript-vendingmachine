import { AuthenticationInfo, UserStoreInterface, Hash, ViewInterface, UserInfo } from '../types';
import { generateUserInfoTemplate } from '../template/authenticationTemplate';
import { requestEditUserInfo } from '../apis';
import { selectDom, selectDoms } from '../utils';
import showSnackbar from '../utils/snackbar';
import { setCookie } from '../utils/cookie';
import { ID, CLASS } from '../constant/selector';
import HASH from '../constant/hash';
import { COOKIE_KEY } from '../constant/cookie';

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

  private changeHashUrl(hash: Hash): void {
    window.history.pushState({ hash }, null, hash);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }

  private onSubmitUserInfoForm = async (e: SubmitEvent) => {
    e.preventDefault();

    const userInfo: AuthenticationInfo = this.convertToUserInfoObject(
      Array.from(this.userInfoInputs)
    );

    const currentUserInfo = this.userStore.getUserInfo();

    try {
      this.userStore.validateEditUserInfoInput(userInfo);
      const { name } = await requestEditUserInfo(
        userInfo,
        currentUserInfo.id,
        currentUserInfo.accessToken
      );

      const editedUserInfo = {
        ...currentUserInfo,
        name,
      };

      this.userStore.setUserInfo(editedUserInfo);

      setCookie(COOKIE_KEY.USER_INFO, JSON.stringify(editedUserInfo));
    } catch (error) {
      showSnackbar(error.message);
      return;
    }

    // TODO: 스낵바로 회원가입에 성공했다는 사실을 알려주기
    this.changeHashUrl(HASH.ITEM_PURCHASE);
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
