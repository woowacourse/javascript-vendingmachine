import { PageView, Admin } from '../../index.d';
import { $ } from '../util/index';
import AdminImpl from '../interactor/AdminImpl';
import Snackbar from './Snackbar';

export default class SignupPage implements PageView {
  private $form: HTMLElement;
  private $email: HTMLElement;
  private $name: HTMLElement;
  private $password: HTMLElement;
  private $passwordConfirmation: HTMLElement;
  private admin: Admin;
  private snackbar: Snackbar;

  constructor(snackbar: Snackbar) {
    this.$form = $('#signup-form');
    this.$email = $('#signup-email');
    this.$name = $('#signup-name');
    this.$password = $('#signup-password');
    this.$passwordConfirmation = $('#signup-password-confirmation');
    this.admin = new AdminImpl();
    this.snackbar = snackbar;
  }

  bindEvent(movePage: Function): void {
    this.$form.addEventListener('submit', this.handleSubmitForm.bind(this, movePage));
  }

  private async handleSubmitForm(movePage: Function, e: Event) {
    e.preventDefault();

    try {
      const adminData = {
        email: (this.$email as HTMLInputElement).value,
        name: (this.$name as HTMLInputElement).value,
        password: (this.$password as HTMLInputElement).value,
        passwordConfirmation: (this.$passwordConfirmation as HTMLInputElement).value,
      };

      await this.admin.signup(adminData);
      movePage();
    } catch ({ message }) {
      this.snackbar.on(message);
    }
  }
}
