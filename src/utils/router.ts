import { App } from '../App';

export class Router {
  app: App;

  constructor(app: App) {
    this.app = app;
    window.addEventListener('popstate', (savedData) => {
      this.handlePopstate(savedData);
    });
  }

  handlePopstate = (savedData) => {
    this.app.app.classList.remove('hide');
    this.app.customerManageApp.classList.add('hide');

    if (savedData.state === null) {
      return;
    }
    if (savedData.state.path === '/') {
      this.app.productPurchaseView.showProductPurchaseTab();
    }
    if (savedData.state.path === '/productManage') {
      this.app.productManageView.eraseAll();
      this.app.productManageView.renderAll();
    }
    if (savedData.state.path === '/balanceCharge') {
      this.app.balanceChargeView.eraseAll();
      this.app.balanceChargeView.renderAll();
    }
    if (savedData.state.path === '/productPurchase') {
      this.app.productPurchaseView.eraseAll();
      this.app.productPurchaseView.renderAll();
    }
    if (savedData.state.path === '/signIn') {
      this.app.customerInformationView.renderSignIn();
    }
    if (savedData.state.path === '/signUp') {
      this.app.customerInformationView.renderSignUp();
    }
    if (savedData.state.path === '/editInformation') {
      this.app.customerInformationView.renderInformationEdit();
    }
  };

  pushHistory(e: Event) {
    let path = '/';
    if (e.type === 'productManageTabClick') {
      path = '/productManage';
    }
    if (e.type === 'balanceChargeTabClick') {
      path = '/balanceCharge';
    }
    if (e.type === 'productPurchaseTabClick') {
      path = '/productPurchase';
    }
    if (e.type === 'signInClick') {
      path = '/signIn';
    }
    if (e.type === 'signUpClick') {
      path = '/signUp';
    }
    if (e.type === 'editInformationClick') {
      path = '/editInformation';
    }
    if (e.type === 'signOutClick') {
      path = '/';
    }
    if (e.type === 'signInOk') {
      path = '/signIn';
    }
    if (e.type === 'signUpOk') {
      path = '/signUp';
    }
    if (e.type === 'editInformationOkay') {
      path = '/editInformation';
    }
    this.pushHistoryPath(path);
  }

  pushHistoryPath(path: string) {
    history.pushState({ path }, '', path);
  }
}
