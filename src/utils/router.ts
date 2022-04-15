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

  pushHistoryPath(path: string) {
    history.pushState({ path }, '', path);
  }
}
