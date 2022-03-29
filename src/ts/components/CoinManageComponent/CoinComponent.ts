import CoinInputComponent from './CoinInputComponent';
import CoinsStateComponent from './CoinsStateComponent';

export default class CoinComponent {
  constructor(private coinManager) {
    new CoinInputComponent(this.coinManager);
    new CoinsStateComponent();
  }
}
