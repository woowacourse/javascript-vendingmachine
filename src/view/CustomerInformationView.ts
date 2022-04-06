import { EditUserInformationPage } from '../component/EditUserInformationPage';
import { SignInPage } from '../component/SignInPage';
import { SignUpPage } from '../component/SignUpPage';
import { SnackBar } from '../component/SnackBar';
import { CoinVault } from '../domain/CoinVault';
import { ProductCatalog } from '../domain/ProductCatalog';
import { UserInfo } from '../interfaces/interface';

export class CustomerInformationView {
  app: HTMLDivElement;
  nav: HTMLElement;
  productCatalog: ProductCatalog;
  coinVault: CoinVault;
  snackBar: SnackBar;
  userInfo: UserInfo;
  signInPage: SignInPage;
  signUpPage: SignUpPage;
  editPage: EditUserInformationPage;
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

  constructor(AppProps) {
    this.app = AppProps.app;
    this.nav = AppProps.nav;
    this.productCatalog = AppProps.productCatalog;
    this.coinVault = AppProps.coinVault;
    this.snackBar = AppProps.snackBar;
    const userInfoProps = { app: AppProps.app, snackBar: AppProps.snackBar };

    this.app.addEventListener('signInOk', this.handleSignInOk);
    this.app.addEventListener('signUpOk', this.handleSignIn);
    this.app.addEventListener('editInformationOk', this.autoSignIn);

    this.signInPage = new SignInPage(userInfoProps);
    this.signUpPage = new SignUpPage(userInfoProps);
    this.editPage = new EditUserInformationPage(userInfoProps);
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
  }

  autoSignIn = () => {
    if (sessionStorage.getItem('userInfo')) {
      this.handleSignInOk();
    }
  };

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

  handleInformationEdit = () => {
    this.app.dispatchEvent(new CustomEvent('editInformationClick'));
    this.renderInformationEdit();
  };

  renderInformationEdit() {
    this.app.classList.add('hide');
    this.customerManageApp.classList.remove('hide');
    this.signUp.classList.add('hide');
    this.signIn.classList.add('hide');
    this.editCustomerInformation.classList.remove('hide');
  }

  handleSignInOk = () => {
    this.eraseAll();
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    this.editPage.setUser();

    this.thumbnail.innerText = this.userInfo.name[0];
    this.customerManageApp.classList.add('hide');
    this.signInBtn.classList.add('hide');
    this.dropDownBtn.classList.remove('hide');

    this.nav.classList.remove('hide');
  };

  handleSignOut = () => {
    this.app.dispatchEvent(new CustomEvent('signOutClick'));
    sessionStorage.removeItem('userInfo');
    this.signInBtn.classList.remove('hide');
    this.dropDownBtn.classList.add('hide');
    this.snackBar.render('로그아웃 되었습니다');
  };

  eraseAll() {
    this.app.classList.remove('hide');
  }
}
