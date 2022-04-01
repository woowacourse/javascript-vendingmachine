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

    const props = {
      target: this.contentsContainer,
      coinVault: this.coinVault,
    };
    this.balanceChargeInput = new BalanceChargeInput(props);
    this.coinVaultTable = new CoinVaultTable(props);
    props.target.addEventListener('balanceChargeTabClick', this.showBalanceChargeTab);
  }

  showBalanceChargeTab = () => {
    this.eraseAll();
    this.renderAll();
  };

  eraseAll() {
    this.contentsContainer.textContent = ``;
  }

  renderAll() {
    this.balanceChargeInput.render();
    this.coinVaultTable.render();
  }
}
