import { BalanceChargeInputForm } from '../component/balanceCharge/BalanceChargeInputForm';
import { CoinVaultTable } from '../component/balanceCharge/CoinVaultTable';

import { CoinVault } from '../domain/CoinVault';

interface BalanceChargeViewInterface {
  getIsRendered();
  show();
  hide();
  renderAll();
}

export class BalanceChargeView implements BalanceChargeViewInterface {
  #balanceChargeInputForm: BalanceChargeInputForm;
  #coinVaultTable: CoinVaultTable;
  #coinVault: CoinVault;
  #balanceChargeContainer: HTMLDivElement;
  #isRendered: boolean;

  constructor({ coinVault }) {
    this.#isRendered = false;
    this.#balanceChargeContainer = document.querySelector('.balance-charge-container');

    this.#coinVault = coinVault;
    this.#balanceChargeInputForm = new BalanceChargeInputForm({
      target: this.#balanceChargeContainer,
      coinVault: this.#coinVault,
    });
    this.#coinVaultTable = new CoinVaultTable({
      target: this.#balanceChargeContainer,
      coinVault: this.#coinVault,
    });
  }

  getIsRendered() {
    return this.#isRendered;
  }

  #setIsRendered(status: boolean) {
    this.#isRendered = status;
  }

  show() {
    this.#balanceChargeContainer.classList.remove('hide');
  }

  hide() {
    this.#balanceChargeContainer.classList.add('hide');
  }

  renderAll() {
    this.#balanceChargeInputForm.render();
    this.#coinVaultTable.render();

    this.#setIsRendered(true);
  }
}
