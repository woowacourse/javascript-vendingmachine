import CoinManagementDomain from '../../domain/CoinManagementDomain/CoinManagement';
import ProductManagementDomain from '../../domain/ProductManagementDomain/ProductManagement';
import PurchaseCashDomain from '../../domain/PurchaseCashDomain/PurchaseCash';
import CoinManagementUI from './CoinManagementUI';
import ProductManagementUI from './ProductManagementUI';
import ProductPurchaseUI from './ProductPurchaseUI';
import { $ } from '../../utils/dom';

export default class MainUI {
  private readonly productDomain = new ProductManagementDomain();
  private readonly coinDomain = new CoinManagementDomain();
  private readonly purchaseCashDomain = new PurchaseCashDomain();
  private readonly productManagementUI = new ProductManagementUI(
    this.productDomain,
  );
  private readonly coinManagementUI = new CoinManagementUI(this.coinDomain);
  private readonly productPurchaseUI = new ProductPurchaseUI(
    this.productDomain,
    this.coinDomain,
    this.purchaseCashDomain,
  );

  renderInitPage(isSignIn: boolean = false) {
    $('#main').classList.remove('hide');
    $('#sign-in').classList.add('hide');
    $('#sign-up').classList.add('hide');
    $('#user-info-edit').classList.add('hide');

    if (isSignIn) {
      this.renderProductManagementUI();
      return;
    }
    this.renderProductPurchaseUI();
  }

  renderProductManagementUI() {
    this.productManagementUI.render();
  }

  renderCoinManagementUI() {
    this.coinManagementUI.render();
  }

  renderProductPurchaseUI() {
    this.productPurchaseUI.render();
  }

  renderUserUI(name: string = '') {
    this.renderUserName(name);
    [$('.nav'), $('.signin-button'), $('.thumbnail')].forEach($button => {
      $button.toggleAttribute('hidden');
    });
  }

  renderUserName(name: string = '') {
    $('.thumbnail').textContent = name.substring(0, 1);
  }
}
