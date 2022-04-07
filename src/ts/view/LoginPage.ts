import { PageView, Admin, AdminEmail, AdminPassword } from '../../index.d';
import { $ } from '../util/index';
import AdminImpl from '../interactor/AdminImpl';
import Snackbar from './Snackbar';

export default class LoginPage implements PageView {
  private $form: HTMLElement;
  private $email: HTMLElement;
  private $password: HTMLElement;
  private admin: Admin;
  private snackbar: Snackbar;

  constructor(snackbar: Snackbar) {
    this.$form = $('#login-form');
    this.$email = $('#login-email');
    this.$password = $('#login-password');
    this.admin = AdminImpl.getInstance();
    this.snackbar = snackbar;
  }

  render(): void {
    if (this.admin.isLogin()) {
      history.back();
    }

    this.$email.focus();
  }

  bindEvent(movePage: Function): void {
    this.$form.addEventListener('submit', this.handleSubmitForm.bind(this, movePage));
  }

  private async handleSubmitForm(movePage: Function, e: Event) {
    e.preventDefault();

    try {
      const email = (this.$email as HTMLInputElement).value as unknown as AdminEmail;
      const password = (this.$password as HTMLInputElement).value as unknown as AdminPassword;

      await this.admin.login(email, password);
      movePage();
    } catch ({ message }) {
      this.snackbar.on(message);
    }
  }
}
