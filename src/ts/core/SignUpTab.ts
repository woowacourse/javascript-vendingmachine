import { $ } from '../utils/dom';
import { SignUp } from '../declarations/coreDeclaration';
import VerifyValueValidation from '../validations/verifyValueValidation';
import { getSignUpInfo } from '../utils/userInfoUtil';
import { loginnedMode } from '../utils/loginUtil';
import { displaySnackbar } from '../utils/snackbar';

class SignUpTab implements SignUp {
  verifyValue: VerifyValueValidation;
  constructor(verifyValue: VerifyValueValidation) {
    this.verifyValue = verifyValue;
    $('#signup-confirm-button').addEventListener('click', this.handleSignUp.bind(this));
  }

  async handleSignUp(): Promise<void> {
    const signUpInfo = getSignUpInfo();
    const { email, name, password, passwordConfirm } = signUpInfo;
    if (!this.verifyValue.verifySignUpInfo(signUpInfo)) {
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, password, passwordConfirm }),
      });

      if (response.ok) {
        const { accessToken, user } = await response.json();

        localStorage.setItem('accessToken', JSON.stringify({ ...user, accessToken }));
        loginnedMode();
      } else {
        const json = await response.json();
        displaySnackbar(json);
      }
    } catch (error) {
      displaySnackbar(error);
    }
  }
}

export default SignUpTab;
