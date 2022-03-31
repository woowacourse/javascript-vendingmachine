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
    if (savedData.state === null) {
      return;
    }
    if (savedData.state.path === '/') {
      this.app.homeView.renderHome();
    }
    if (savedData.state.path === '/productManage') {
      this.app.productManageView.eraseAll();
      this.app.productManageView.renderAll();
    }
    if (savedData.state.path === '/balanceCharge') {
      this.app.balanceChargeView.eraseAll();
      this.app.balanceChargeView.renderAll();
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
    this.pushHistoryPath(path);
  }

  pushHistoryPath(path: string) {
    history.pushState({ path }, '', path);
  }
}
