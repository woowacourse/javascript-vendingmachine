import { SignInPage } from '../component/SignInPage';
import { SignUpPage } from '../component/SignUpPage';

export class CustomerInformationView {
  app: HTMLDivElement;
  signInPage: SignInPage;
  signUpPage: SignUpPage;
  customerManageApp: HTMLDivElement;
  signInBtn: HTMLButtonElement;
  signUpBtn: HTMLButtonElement;
  editCustomerInformationBtn: HTMLButtonElement;
  signOutBtn: HTMLButtonElement;
  dropDownBtn: HTMLButtonElement;
  thumbnail: HTMLDivElement;
  signIn: HTMLDivElement;
  signUp: HTMLDivElement;
  editCustomerInformation: HTMLDivElement;
  constructor(props) {
    this.app = props.app;
    this.app.addEventListener('signInOk', this.handleSignInOk);

    this.signInPage = new SignInPage(this.app);
    this.signUpPage = new SignUpPage();
    this.customerManageApp = document.querySelector('.customer-manage-app');

    this.signIn = document.querySelector('.sign-in');
    this.signInBtn = document.querySelector('.sign-in-button');
    this.signInBtn.addEventListener('click', this.handleSignIn);

    this.signUp = document.querySelector('.sign-up');
    this.signUpBtn = document.querySelector('.sign-up-button');
    this.signUpBtn.addEventListener('click', this.handleSignUp);

    this.editCustomerInformation = document.querySelector('.edit-customer-information');
    this.editCustomerInformationBtn = document.querySelector('.edit-information-button');
    this.editCustomerInformationBtn.addEventListener('click', this.handleInformationEdit);

    this.signOutBtn = document.querySelector('.sign-out-button');
    this.signOutBtn.addEventListener('click', this.handleSignOut);

    this.dropDownBtn = document.querySelector('.drop-down-button');

    this.thumbnail = document.querySelector('.thumbnail');
    this.autoSignIn();
  }

  autoSignIn() {
    if (sessionStorage.getItem('userInfo')) {
      this.handleSignInOk();
    }
  }

  handleSignIn = () => {
    this.app.dispatchEvent(new CustomEvent('signInClick'));
    this.renderSignIn();
  };

  renderSignIn() {
    console.log('rendersin');
    this.app.classList.add('hide');
    this.customerManageApp.classList.remove('hide');
    this.signIn.classList.remove('hide');
    this.signUp.classList.add('hide');
    this.editCustomerInformation.classList.add('hide');
  }

  handleSignUp = () => {
    this.app.dispatchEvent(new CustomEvent('signUpClick'));
    this.renderSignUp();
  };

  renderSignUp() {
    console.log('rendersup');
    this.app.classList.add('hide');
    this.customerManageApp.classList.remove('hide');
    this.signUp.classList.remove('hide');
    this.signIn.classList.add('hide');
    this.editCustomerInformation.classList.add('hide');
  }

  handleInformationEdit = () => {
    console.log('informaitoi edit');
    this.app.dispatchEvent(new CustomEvent('editInformationClick'));
    this.renderInformationEdit();
  };

  renderInformationEdit() {
    console.log('rendersedit');
    this.app.classList.add('hide');
    this.customerManageApp.classList.remove('hide');
    this.signUp.classList.add('hide');
    this.signIn.classList.add('hide');
    this.editCustomerInformation.classList.remove('hide');
  }

  handleSignInOk = () => {
    this.eraseAll();
    const userInfo = sessionStorage.getItem('userInfo');
    const thumbnailWord = JSON.parse(userInfo).name[0];
    this.thumbnail.innerText = thumbnailWord;
    this.signInBtn.classList.add('hide');
    this.dropDownBtn.classList.remove('hide');
  };

  handleSignOut = () => {
    this.app.dispatchEvent(new CustomEvent('signOutClick'));
    sessionStorage.clear();
    this.signInBtn.classList.remove('hide');
    this.dropDownBtn.classList.add('hide');
  };

  eraseAll() {
    this.app.classList.remove('hide');
  }
}
