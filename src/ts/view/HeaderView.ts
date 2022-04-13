import { UserStoreInterface, DOMEvent, Hash, HeaderInterface } from '../types';
import {
  generateAuthenticationHeaderTemplate,
  generateUnauthorizedTabHeaderTemplate,
  generateAuthorizedTebHeaderTemplate,
} from '../template/headerTemplate';
import { selectDom, selectDoms } from '../utils';
import { deleteCookie } from '../utils/cookie';
import { CLASS, ID } from '../constant/selector';
import HASH from '../constant/hash';
import { COOKIE_KEY } from '../constant/cookie';

class HeaderView implements HeaderInterface {
  private userStore: UserStoreInterface;

  private header: HTMLHeadElement | null = selectDom('header');

  private sideButtonWrapper: HTMLElement | null = null;

  private navTabButtons: NodeListOf<HTMLButtonElement> | null = null;

  private previousHash: Hash = null;

  constructor(userStore: UserStoreInterface) {
    this.userStore = userStore;
  }

  render(hash: Hash): void {
    const userInfo = this.userStore.getUserInfo();

    this.header.replaceChildren();

    if (hash === HASH.LOGIN) {
      this.header.insertAdjacentHTML('afterbegin', generateAuthenticationHeaderTemplate('로그인'));
      return;
    }

    if (hash === HASH.REGISTER) {
      this.header.insertAdjacentHTML(
        'afterbegin',
        generateAuthenticationHeaderTemplate('회원가입')
      );
      return;
    }

    if (hash === HASH.USER_INFO_EDIT) {
      this.header.insertAdjacentHTML(
        'afterbegin',
        generateAuthenticationHeaderTemplate('회원 정보 수정')
      );
    }

    // TODO: 헤더 렌더링 최적화 필요 - 현재 탭 간 이동할 때 헤더 전체가 리렌더링 되고있다.
    if (this.isTabHash(hash) && userInfo) {
      this.header.insertAdjacentHTML(
        'afterbegin',
        generateAuthorizedTebHeaderTemplate(hash, userInfo.name)
      );

      this.bindAuthorizedTabHeaderEvent();
      return;
    }

    if (this.isTabHash(hash) && !userInfo) {
      this.header.insertAdjacentHTML('afterbegin', generateUnauthorizedTabHeaderTemplate());

      this.bindUnauthorizedTabHeaderEvent();
    }
  }

  private bindAuthorizedTabHeaderEvent(): void {
    const thumbnailButton: HTMLButtonElement | null = selectDom(`.${CLASS.THUMBNAIL_BUTTON}`);
    this.sideButtonWrapper = selectDom(`.${CLASS.SIDE_BUTTON_WRAPPER}`);

    const tabButtonContainer: HTMLElement | null = selectDom('#tab-button-container');
    this.navTabButtons = selectDoms('.nav-tab-button');

    thumbnailButton.addEventListener('click', this.onClickThumbnailButton);
    this.sideButtonWrapper.addEventListener('click', this.onClickSideButton);
    tabButtonContainer.addEventListener('click', this.onClickTabButton);
  }

  private bindUnauthorizedTabHeaderEvent(): void {
    const loginButton: HTMLButtonElement | null = selectDom('.login-button');

    loginButton.addEventListener('click', this.onClickLoginButton);
  }

  private onClickThumbnailButton = (): void => {
    this.sideButtonWrapper.classList.toggle(CLASS.HIDE);
  };

  private onClickSideButton = ({ target }: DOMEvent): void => {
    if (target.id === ID.EDIT_BUTTON) {
      this.handleEditUserInfo();
      return;
    }

    if (target.id === ID.LOGOUT_BUTTON) {
      this.handleLogout();
    }
  };

  private onClickTabButton = ({ target }: DOMEvent): void => {
    if (!target.classList.contains('nav-tab-button')) {
      return;
    }

    // TODO: 같은 탭을 눌렀을 때 리렌더링이 되지 않도록 방지하는 과정 필요!

    const hash = target.dataset.hash as Hash;

    this.navTabButtons.forEach((navTabButton) => {
      navTabButton.classList.toggle(CLASS.SELECTED, navTabButton.dataset.hash === hash);
    });

    this.changeHashUrl(hash);
  };

  private onClickLoginButton = () => {
    this.changeHashUrl(HASH.LOGIN);
  };

  private handleEditUserInfo() {
    this.changeHashUrl(HASH.USER_INFO_EDIT);
  }

  private handleLogout() {
    this.userStore.setUserInfo(null);
    deleteCookie(COOKIE_KEY.USER_INFO);
    this.changeHashUrl(HASH.ITEM_PURCHASE);
  }

  private isTabHash(hash: Hash): boolean {
    return (
      hash === '' ||
      hash === HASH.ITEM_MANAGE ||
      hash === HASH.COIN_RECHARGE ||
      hash === HASH.ITEM_PURCHASE
    );
  }

  private changeHashUrl(hash: Hash): void {
    window.history.pushState({ hash }, null, hash);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }
}

export default HeaderView;
