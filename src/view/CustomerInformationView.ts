export class CustomerInformationView {
  app: HTMLDivElement;
  customerManageApp: HTMLDivElement;
  signInBtn: HTMLButtonElement;

  constructor(props) {
    this.app = props.app;
    this.customerManageApp = document.querySelector('.customer-manage-app');
    this.signInBtn = document.querySelector('.sign-in-button');
    this.signInBtn.addEventListener('click', this.handleSignIn);
  }

  handleSignIn = () => {
    this.app.dispatchEvent(new CustomEvent('signInClick'));
    this.renderSignIn();
  };
  renderSignIn() {
    this.app.classList.add('hide');
    this.customerManageApp.classList.remove('hide');
  }
}
