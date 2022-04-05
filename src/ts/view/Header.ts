import { Hash, HeaderInterface } from '../types';
import { generateTabHeaderTemplate } from '../template/headerTemplate';
import { selectDom, selectDoms } from '../utils';
import { CLASS } from '../constant/selector';
import HASH from '../constant/hash';

class Header implements HeaderInterface {
  private header: HTMLHeadElement | null = selectDom('header');

  private navTabButtons: NodeListOf<HTMLButtonElement> | null = null;

  private previousHash: Hash = null;

  render(hash: Hash): void {
    // TODO: 렌더 메서드 리팩터링 필요

    if (this.isTabHash(hash) && !this.isTabHash(this.previousHash)) {
      this.renderTabHeader(hash);
      this.bindTabHeaderEvent();
      this.previousHash = hash;

      return;
    }

    if (this.isTabHash(hash)) {
      if (hash === '') {
        this.navTabButtons.forEach((navTabButton) => {
          navTabButton.classList.toggle(
            CLASS.SELECTED,
            navTabButton.dataset.hash === HASH.ITEM_PURCHASE
          );
        });
        this.previousHash = hash;
        return;
      }

      this.navTabButtons.forEach((navTabButton) => {
        navTabButton.classList.toggle(CLASS.SELECTED, navTabButton.dataset.hash === hash);
      });

      this.previousHash = hash;
      return;
    }
  }

  changeThumbnail(): void {}

  private renderTabHeader(hash: Hash): void {
    this.header.innerHTML = generateTabHeaderTemplate(hash);
  }

  private bindTabHeaderEvent(): void {
    const loginButton: HTMLButtonElement | null = selectDom('.login-button');
    const tabButtonContainer: HTMLElement | null = selectDom('#tab-button-container');
    this.navTabButtons = selectDoms('.nav-tab-button');

    loginButton.addEventListener('click', this.onClickLoginButton);
    tabButtonContainer.addEventListener('click', this.onClickTabButton);
  }

  private onClickLoginButton = () => {
    // TODO: 로그인 페이지로 이동
  };

  private onClickTabButton = ({ target }: MouseEvent): void => {
    const targetElement = target as HTMLElement;

    if (!targetElement.classList.contains('nav-tab-button')) {
      return;
    }

    // TODO: 같은 탭을 눌렀을 때 리렌더링이 되지 않도록 방지하는 과정 필요!

    const hash = targetElement.dataset.hash as Hash;

    // TODO: 탭
    this.navTabButtons.forEach((navTabButton) => {
      navTabButton.classList.toggle(CLASS.SELECTED, navTabButton.dataset.hash === hash);
    });

    this.changeHashUrl(hash);
  };

  private isTabHash(hash: Hash): boolean {
    return (
      hash === '' ||
      hash === HASH.ITEM_MANAGE ||
      hash === HASH.COIN_RECHARGE ||
      hash === HASH.ITEM_PURCHASE
    );
  }

  changeHashUrl(hash: Hash): void {
    window.history.pushState({ hash }, null, hash);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }
}

export default Header;
