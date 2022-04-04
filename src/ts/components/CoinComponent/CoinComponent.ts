import { $ } from '../../dom';
import { on } from '../../events';
import CoinInputComponent from './CoinInputComponent';
import CoinsStateComponent from './CoinsStateComponent';

export default class CoinComponent {
  private $app = $('#app');
  private coinInputComponent = new CoinInputComponent(
    this.vendingMachineCoinManager
  );
  private coinStateComponent = new CoinsStateComponent(
    this.vendingMachineCoinManager
  );

  constructor(private vendingMachineCoinManager) {
    on(this.$app, '@coinsTabClicked', this.render);
  }
  render = () => {
    this.coinInputComponent.renderTotalCoins();
    this.coinStateComponent.render();
  };
}
