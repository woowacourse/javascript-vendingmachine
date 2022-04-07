import { PageView, Admin } from '../../index.d';
import { $ } from '../util/index';
import AdminImpl from '../interactor/AdminImpl';
import Snackbar from './Snackbar';

export default class AdminPage implements PageView {
  private $form: HTMLElement;
  private $email: HTMLElement;
  private $name: HTMLElement;
  private $password: HTMLElement;
  private $passwordConfirmation: HTMLElement;
  private admin: Admin;
  private snackbar: Snackbar;

  constructor(snackbar: Snackbar) {
    this.$form = $('#admin-form');
    this.$email = $('#admin-email');
    this.$name = $('#admin-name');
    this.$password = $('#admin-password');
    this.$passwordConfirmation = $('#admin-password-confirmation');
    this.admin = AdminImpl.getInstance();
    this.snackbar = snackbar;
  }

  render(): void {
    if (!this.admin.isLogin()) {
      history.back();
      return;
    }

    this.admin.getAdmin().then((email: string) => {
      (this.$email as HTMLInputElement).value = email;
      (this.$name as HTMLInputElement).value = this.admin.adminName;
      this.$password.focus();
    });
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

      await this.admin.modifyAdmin(adminData);
      movePage();
    } catch ({ message }) {
      this.snackbar.on(message);
    }
  }
}
