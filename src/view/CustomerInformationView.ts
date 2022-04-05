import { SignInPage } from '../component/SignInPage';
import { SignUpPage } from '../component/SignUpPage';

export class CustomerInformationView {
  app: HTMLDivElement;
  signInPage: SignInPage;
  signUpPage: SignUpPage;
  customerManageApp: HTMLDivElement;
  signInBtn: HTMLButtonElement;
  signUpBtn: HTMLButtonElement;

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
  }

  handleSignIn = () => {
    this.app.dispatchEvent(new CustomEvent('signInClick'));
    this.renderSignIn();
  };

  renderSignIn() {
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
    this.app.classList.add('hide');
    this.customerManageApp.classList.remove('hide');
    this.signUp.classList.remove('hide');
    this.signIn.classList.add('hide');
    this.editCustomerInformation.classList.add('hide');
  }

  handleInformationEdit = () => {};

  handleSignInOk = () => {
    this.eraseAll();
    console.log(sessionStorage.getItem('userInfo'));
    //드롭다운메뉴 만들기
    // 회원정보수정 -> handleInformationEdit -> renderInformationEdit
    // 로그아웃 -> handleSignOut -> renderHone, session Storage.clear()
  };

  eraseAll() {
    this.app.classList.remove('hide');
    this.customerManageApp.classList.add('hide');
  }
}
