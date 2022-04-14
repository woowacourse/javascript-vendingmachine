import { BalanceChargeInput } from '../component/BalanceChargeInput';
import { CoinVaultTable } from '../component/CoinVaultTable';
import { AppProps } from '../interfaces/interface';
import { CoinVault } from '../domain/CoinVault';

export class BalanceChargeView {
  balanceChargeInput: BalanceChargeInput;
  coinVaultTable: CoinVaultTable;
  coinVault: CoinVault;
  contentsContainer: HTMLDivElement;

  constructor(props: AppProps) {
    this.contentsContainer = props.contentsContainer;
    this.coinVault = props.coinVault;

    const balanceChargeProps = {
      target: props.contentsContainer,
      coinVault: props.coinVault,
      snackBar: props.snackBar,
    };

    this.balanceChargeInput = new BalanceChargeInput(balanceChargeProps);
    this.coinVaultTable = new CoinVaultTable(balanceChargeProps);
    this.contentsContainer.addEventListener('balanceChargeTabClick', this.showBalanceChargeTab);
  }

  autoSignIn() {
    this.coinVault = JSON.parse(sessionStorage.getItem('coinVault'));
  }

  showBalanceChargeTab = () => {
    this.pushState();
    this.eraseAll();
    this.renderAll();
  };

  pushState() {
    const path = '/balanceCharge';
    history.pushState({ path }, '', path);
  }

  eraseAll() {
    this.contentsContainer.textContent = ``;
  }

  renderAll() {
    this.balanceChargeInput.render();
    this.coinVaultTable.render();
  }
}
