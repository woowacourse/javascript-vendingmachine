import CoinManagementDomain from '../../domain/CoinManagementDomain/CoinManagement';
import ProductManagementDomain from '../../domain/ProductManagementDomain/ProductManagement';
import PurchaseCashDomain from '../../domain/PurchaseCashDomain/PurchaseCash';
import { $ } from '../../utils/dom';
import CoinManagementUI from './CoinManagementUI';
import ProductManagementUI from './ProductManagementUI';
import ProductPurchaseUI from './ProductPurchaseUI';

export default class MainUI {
  private readonly $main = $('#main');
  private readonly $signIn = $('#sign-in');
  private readonly $signUp = $('#sign-up');
  private readonly $nav = $('.nav');
  private readonly $signinButton = $('.signin-button');
  private readonly $thumbnail = $('.thumbnail');

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

  renderInitPage(isLogin: boolean = false) {
    this.$main.classList.remove('hide');
    this.$signIn.classList.add('hide');
    this.$signUp.classList.add('hide');

    if (isLogin) {
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

  renderUserUI(name: string) {
    this.$thumbnail.textContent = name.substr(0, 1);

    [this.$nav, this.$signinButton, this.$thumbnail].forEach($button => {
      $button.toggleAttribute('hidden');
    });
  }
}
