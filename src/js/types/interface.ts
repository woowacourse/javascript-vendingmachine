export interface Controller {
  bindEvents(): void;
  loadPage(isLogin?): void;
}
