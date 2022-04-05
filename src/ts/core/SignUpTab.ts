import { $ } from '../utils/dom';
import { SignUp } from '../declarations/coreDeclaration';

class SignUpTab implements SignUp {
  constructor() {
    $('#sign-up-confirm-button').addEventListener('click', this.handleSignUp);
  }

  handleSignUp(e: Event): void {
    console.log('SignUp');
    // 값 검증 -> 성공할 시,
    // 정보 로컬스토리지로
    // route 수정
    // index.js로
  }
}

export default SignUpTab;
