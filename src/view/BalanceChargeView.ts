import { BalanceChargeInput } from '../component/BalanceChargeInput';
import { CoinVaultTable } from '../component/CoinVaultTable';

import { CoinVault } from '../domain/CoinVault';

export class BalanceChargeView {
  balanceChargeInput: BalanceChargeInput;
  coinVaultTable: CoinVaultTable;
  coinVault: CoinVault;
  contentsContainer: HTMLDivElement;

  constructor() {
    this.coinVault = new CoinVault();

    this.contentsContainer = document.querySelector('#contents-container');
    this.contentsContainer.textContent = ``;

    this.balanceChargeInput = new BalanceChargeInput({
      target: this.contentsContainer,
      coinVault: this.coinVault,
    });
    this.coinVaultTable = new CoinVaultTable({
      target: this.contentsContainer,
      coinVault: this.coinVault,
    });

    this.balanceChargeInput.render();
    this.coinVaultTable.render();
  }
}
