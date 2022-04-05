import { $ } from '../utils/dom';
import { SignUp } from '../declarations/coreDeclaration';
import VerifyValueValidation from '../validations/verifyValueValidation';
import { getSignUpInfo } from '../utils/userInfoUtil';

class SignUpTab implements SignUp {
  verifyValue: VerifyValueValidation;
  constructor(verifyValue: VerifyValueValidation) {
    this.verifyValue = verifyValue;
    $('#sign-up-confirm-button').addEventListener('click', this.handleSignUp.bind(this));
  }

  handleSignUp(e: Event): void {
    const signUpInfo = getSignUpInfo();
    if (!this.verifyValue.verifySignUpInfo(signUpInfo)) {
      return;
    }
    // 정보 로컬스토리지로
    // route 수정
    // index.js로
  }
}

export default SignUpTab;
