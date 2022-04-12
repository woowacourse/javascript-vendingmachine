import { $ } from '../utils/dom';
import { SignUp } from '../declarations/coreDeclaration';
import VerifyValueValidation from '../validations/verifyValueValidation';
import { getSignUpInfo } from '../utils/userInfoUtil';
import { loginnedMode } from '../utils/loginUtil';
import { showSnackbar } from '../utils/snackbar';
import { signUpUrl } from '../constants';
import { fetchUtil } from '../utils/fetchUtil';

class SignUpManage implements SignUp {
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
      const response = await fetchUtil(signUpUrl, 'POST', {
        email,
        name,
        password,
        passwordConfirm,
      });

      if (response.ok) {
        const { accessToken, user } = await response.json();

        localStorage.setItem('accessToken', JSON.stringify({ ...user, accessToken }));
        loginnedMode();
      } else {
        const json = await response.json();
        showSnackbar(json);
      }
    } catch (error) {
      showSnackbar(error);
    }
  }
}

export default SignUpManage;
