import { UserManagerInterface } from '../domain/UserManager';
import { $, alertSnackBar } from '../utils';
import { SUCCESS_MESSAGE } from '../constants';

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

  handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const userInfo = {
      email: this.$registerEmail.value,
      name: this.$registerName.value,
      password: this.$registerPassword.value,
      passwordCheck: this.$registerPasswordCheck.value,
    };

    try {
      this.userManager.registerUser(userInfo);
      alertSnackBar(SUCCESS_MESSAGE.REGISTER);
      location.href = 'http://localhost:9000/#!/login';
    } catch (error) {
      alertSnackBar(error.message);
    }
  };
}

export default RegisterView;
