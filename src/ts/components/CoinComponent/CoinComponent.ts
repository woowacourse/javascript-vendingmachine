import CoinInputComponent from './CoinInputComponent';
import CoinsStateComponent from './CoinsStateComponent';

export default class CoinComponent {
  constructor(private vendingMachineCoinManager) {
    new CoinInputComponent(this.vendingMachineCoinManager);
    new CoinsStateComponent();
  }
}
