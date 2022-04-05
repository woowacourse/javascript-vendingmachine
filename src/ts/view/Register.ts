import { Hash, ViewInterface } from '../types';
import { generateRegisterTemplate } from '../template/authenticationTemplate';
import { selectDom } from '../utils';
import { ID } from '../constant/selector';

class Register implements ViewInterface {
  tabHash: Hash;

  content: HTMLElement | null = selectDom(`#${ID.CONTENT}`);

  constructor(tabHash: Hash) {
    this.tabHash = tabHash;
  }

  render(): void {
    this.content.replaceChildren();
    this.content.insertAdjacentHTML('afterbegin', generateRegisterTemplate());
    this.content.classList.add('auth-content');
    this.content.classList.remove('tab-content');
  }
}

export default Register;
