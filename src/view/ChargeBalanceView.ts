import { ChargeBalanceInput } from '../component/chargeBalanceInput';
import { CoinVaultTable } from '../component/CoinVaultTable';

export class ChargeBalanceView {
  chargeBalanceInput: ChargeBalanceInput;
  coinVaultTable: CoinVaultTable;
  contentsContainer: HTMLDivElement;

  constructor() {
    this.chargeBalanceInput = new ChargeBalanceInput();
    this.coinVaultTable = new CoinVaultTable();

    this.contentsContainer = document.querySelector('#contents-container');
    this.contentsContainer.textContent = ``;

    this.chargeBalanceInput.render(this.contentsContainer);
    this.coinVaultTable.render(this.contentsContainer);
  }
}
