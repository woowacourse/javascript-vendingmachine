import { Hash, ViewInterface } from '../types';
import { generateLoginTemplate } from '../template/authenticationTemplate';
import { selectDom } from '../utils/';
import { ID } from '../constant/selector';

class Login implements ViewInterface {
  tabHash: Hash;

  content: HTMLElement | null = selectDom(`#${ID.CONTENT}`);

  constructor(tabHash: Hash) {
    this.tabHash = tabHash;
  }

  render(): void {
    this.content.replaceChildren();
    this.content.insertAdjacentHTML('afterbegin', generateLoginTemplate());
  }
}

export default Login;
