import { $, $$, emit } from '../utils/common';
import { mainTemplate } from '../templates/main/mainTemplate';
import { CUSTOM_EVENT, FIRST_INDEX, URL } from '../constants/appContants';
import { SELECTOR } from '../constants/viewConstants';
import ManageItemView from './main/mangeItemView';
import ChargeMoneyView from './main/chargeMoneyView';
import PurchaseItemView from './main/purchaseItemView';
import VendingMachine from '../vendingMachine/vendingMachine';
import AuthManager from '../auth/authManager';
import UserMenuView from './main/userMenuView';

export default class MainView {
  private $app: HTMLElement;
  private vendingMachine: VendingMachine;
  private manageItemView: ManageItemView;
  private chargeMoneyView: ChargeMoneyView;
  private purchaseItemView: PurchaseItemView;
  private userMenuView: UserMenuView;

  constructor() {
    this.$app = $(SELECTOR.ID.APP);
    this.vendingMachine = new VendingMachine();
    this.manageItemView = new ManageItemView(this.vendingMachine);
    this.chargeMoneyView = new ChargeMoneyView(this.vendingMachine);
    this.purchaseItemView = new PurchaseItemView(this.vendingMachine);
    this.userMenuView = new UserMenuView();
  }

  render() {
    this.$app.replaceChildren();
    this.$app.insertAdjacentHTML('beforeend', mainTemplate);
    this.checkSignIn();

    $(SELECTOR.CLASS.NAV_CONTAINER).addEventListener('click', this.handleClickNavButton.bind(this));
    $(SELECTOR.ID.SIGN_BUTTON).addEventListener('click', this.handleSignButtonClick.bind(this));
  }

  renderMainPageSection(url: string) {
    switch (url) {
      case URL.MANAGE_ITEM:
        this.manageItemView.render();
        this.changeButtonColor(SELECTOR.ID_STRING.ITEM_MANGE_TAB);
        break;
      case URL.CHARGE_MONEY:
        this.chargeMoneyView.render();
        this.changeButtonColor(SELECTOR.ID_STRING.MONEY_CHARGE_TAB);
        break;
      case URL.PURCHASE_ITEM:
        this.purchaseItemView.render();
        this.changeButtonColor(SELECTOR.ID_STRING.ITEM_PURCHASE_TAB);
        break;
      default:
        this.manageItemView.render();
        this.changeButtonColor(SELECTOR.ID_STRING.ITEM_MANGE_TAB);
    }
  }

  changeButtonColor(targetButtonId: string) {
    const $navButtons = $$(SELECTOR.CLASS.NAV_BUTTON);

    $navButtons.forEach($navButton =>
      $navButton.id === targetButtonId
        ? $navButton.classList.add(SELECTOR.CLASS_STRING.NAV_BUTTON_CLICKED)
        : $navButton.classList.remove(SELECTOR.CLASS_STRING.NAV_BUTTON_CLICKED)
    );
  }

  private handleClickNavButton(event: Event) {
    const $navButton = event.target as HTMLButtonElement;
    const targetButtonId = $navButton.id;
    const { url } = $navButton.dataset;

    if (!$navButton.classList.contains(SELECTOR.CLASS_STRING.NAV_BUTTON_CLICKED)) {
      this.changeButtonColor(targetButtonId);
      this.renderMainPageSection(url);
      emit({ eventName: CUSTOM_EVENT.ROUTE_CHANGE, detail: { url, page: URL.MAIN } });
    }
  }

  private handleSignButtonClick(event) {
    const $signButton = event.target;

    if ($signButton.classList.contains(SELECTOR.CLASS_STRING.SIGN_IN)) {
      this.handleSiginClick($signButton);
      return;
    }
    if ($signButton.classList.contains(SELECTOR.CLASS_STRING.THUMBNAIL)) {
      this.handleThumbnailClick($signButton);
      return;
    }
    if ($signButton.classList.contains(SELECTOR.CLASS_STRING.THUMBNAIL_ACTIVE)) {
      this.handleThumbnailClse($signButton);
    }
  }

  private handleSiginClick($signButton) {
    const { url } = $signButton.dataset;

    emit({ eventName: CUSTOM_EVENT.ROUTE_CHANGE, detail: { url, page: URL.SIGN } });
    emit({ eventName: CUSTOM_EVENT.RENDER_PAGE });
  }

  private handleThumbnailClick($signButton) {
    $signButton.classList.replace(
      SELECTOR.CLASS_STRING.THUMBNAIL,
      SELECTOR.CLASS_STRING.THUMBNAIL_ACTIVE
    );
    this.userMenuView.showMenu();
  }

  private handleThumbnailClse($signButton) {
    $signButton.classList.replace(
      SELECTOR.CLASS_STRING.THUMBNAIL_ACTIVE,
      SELECTOR.CLASS_STRING.THUMBNAIL
    );
    this.userMenuView.hideMeny();
  }

  private checkSignIn() {
    if (!AuthManager.shared().accessToken) {
      $(SELECTOR.ID.ITEM_MANAGE_TAB).classList.add(SELECTOR.CLASS_STRING.DISPLAY_NONE);
      $(SELECTOR.ID.MONEY_CHARGE_TAB).classList.add(SELECTOR.CLASS_STRING.DISPLAY_NONE);
      return;
    }
    $(SELECTOR.ID.SIGN_BUTTON).classList.replace(
      SELECTOR.CLASS_STRING.SIGN_IN,
      SELECTOR.CLASS_STRING.THUMBNAIL
    );
    $(SELECTOR.ID.SIGN_BUTTON).textContent = AuthManager.shared().userData.name.charAt(FIRST_INDEX);
  }
}
