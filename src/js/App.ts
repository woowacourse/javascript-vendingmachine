import AppController from './controllers/AppController';

export default class App {
  appController: AppController;

  constructor() {
    this.appController = new AppController();
    this.appController.bindEvents();
  }

  init() {
    this.appController.route();
  }
}

type ObjectType = {
  a: number;
};
const object: ObjectType = {
  a: 1,
};
