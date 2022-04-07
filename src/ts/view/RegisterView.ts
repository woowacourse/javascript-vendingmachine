import { UserManagerInterface } from '../domain/UserManager';
import { $ } from '../utils';
import { alertSnackBar } from '../snackbar';
import { SUCCESS_MESSAGE } from '../constants';
import { checkRegister } from '../domain/validator';

export interface RegisterViewInterface {
  $registerForm: HTMLFormElement;
  $registerEmail: HTMLInputElement;
  $registerName: HTMLInputElement;
  $registerPassword: HTMLInputElement;
  $registerPasswordCheck: HTMLInputElement;

  userManager: UserManagerInterface;

  handleSubmit(event: SubmitEvent): void;
}

class RegisterView implements RegisterViewInterface {
  $registerForm: HTMLFormElement;
  $registerEmail: HTMLInputElement;
  $registerName: HTMLInputElement;
  $registerPassword: HTMLInputElement;
  $registerPasswordCheck: HTMLInputElement;

  userManager: UserManagerInterface;

  constructor(userManager: UserManagerInterface) {
    this.$registerForm = $('.register-form');
    this.$registerEmail = $('#register-email');
    this.$registerName = $('#register-name');
    this.$registerPassword = $('#register-password');
    this.$registerPasswordCheck = $('#register-password-check');

    this.userManager = userManager;

    this.$registerForm.addEventListener('submit', this.handleSubmit);
  }

  handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    const userInfo = {
      email: this.$registerEmail.value,
      name: this.$registerName.value,
      password: this.$registerPassword.value,
      passwordCheck: this.$registerPasswordCheck.value,
    };

    try {
      checkRegister(userInfo.name, userInfo.password, userInfo.passwordCheck);
      const result = await this.userManager.registerUser(userInfo);
      if (result) {
        alertSnackBar(SUCCESS_MESSAGE.REGISTER);
        location.href = 'http://localhost:9000/#!/login';
      }
    } catch (error) {
      alertSnackBar(error.message);
    }
  };
}

export default RegisterView;
