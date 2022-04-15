import { SUCCESS_MESSAGE } from '../constants';
import { UserManagerInterface } from '../domain/UserManager';
import { $ } from '../utils';
import { alertSnackBar } from '../snackbar';

export interface LoginViewInterface {
  $loginForm: HTMLFormElement;
  $loginEmail: HTMLInputElement;
  $loginPassword: HTMLInputElement;

  userManager: UserManagerInterface;

  handleSubmit(event: SubmitEvent): void;
}

class LoginView implements LoginViewInterface {
  $loginForm: HTMLFormElement;
  $loginEmail: HTMLInputElement;
  $loginPassword: HTMLInputElement;

  userManager: UserManagerInterface;

  constructor(userManager: UserManagerInterface) {
    this.$loginForm = $('.login-form');
    this.$loginEmail = $('#login-email', this.$loginForm);
    this.$loginPassword = $('#login-password', this.$loginForm);

    this.userManager = userManager;

    this.$loginForm.addEventListener('submit', this.handleSubmit);
  }

  handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    const loginInfo = {
      email: this.$loginEmail.value,
      password: this.$loginPassword.value,
    };

    try {
      const result = await this.userManager.login(loginInfo);
      if (result) {
        alertSnackBar(SUCCESS_MESSAGE.LOGIN);
        location.href = 'http://localhost:9000/#!/purchase-product';
      }
    } catch (error) {
      alertSnackBar(error.message);
    }
  };
}

export default LoginView;
