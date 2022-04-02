import { BalanceChargeInput } from '../component/BalanceChargeInput';
import { CoinVaultTable } from '../component/CoinVaultTable';
import { AppProps } from '../interfaces/interface';
import { CoinVault } from '../domain/CoinVault';

export class BalanceChargeView {
  balanceChargeInput: BalanceChargeInput;
  coinVaultTable: CoinVaultTable;
  coinVault: CoinVault;
  contentsContainer: HTMLDivElement;

  constructor(AppProps: AppProps) {
    this.contentsContainer = AppProps.contentsContainer;
    const balanceChargeProps = {
      target: AppProps.contentsContainer,
      coinVault: AppProps.coinVault,
    };

    this.balanceChargeInput = new BalanceChargeInput(balanceChargeProps);
    this.coinVaultTable = new CoinVaultTable(balanceChargeProps);
    this.contentsContainer.addEventListener('balanceChargeTabClick', this.showBalanceChargeTab);
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
