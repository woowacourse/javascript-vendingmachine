import { BalanceChargeInput } from '../component/BalanceChargeInput';
import { CoinVaultTable } from '../component/CoinVaultTable';

import { CoinVault } from '../domain/CoinVault';

export class BalanceChargeView {
  balanceChargeInput: BalanceChargeInput;
  coinVaultTable: CoinVaultTable;
  coinVault: CoinVault;
  contentsContainer: HTMLDivElement;
  props: object;

  constructor() {
    this.coinVault = new CoinVault();

    this.contentsContainer = document.querySelector('#contents-container');
  }

  init() {
    this.contentsContainer.textContent = ``;

    this.props = {
      target: this.contentsContainer,
      coinVault: this.coinVault,
    };
    this.balanceChargeInput = new BalanceChargeInput(this.props);
    this.coinVaultTable = new CoinVaultTable(this.props);
  }

  renderAll() {
    this.balanceChargeInput.render();
    this.coinVaultTable.render();
  }
}
