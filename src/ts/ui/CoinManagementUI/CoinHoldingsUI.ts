import { $, replaceHTML } from '../../utils/dom';

export default class CoinHoldingsUI {
  private coinDomain;

  constructor(coinDomain) {
    this.coinDomain = coinDomain;
    this.render();
  }

  render() {
    replaceHTML($('.coin-holdings__container'), this.template());
  }

  template() {
    const baseTemplate = `
      <div class="coin-holdings__item grid-item grid-header">동전</div>
      <div class="coin-holdings__item grid-item grid-header">개수</div>
    `;

    const { coins } = this.coinDomain;

    const coinsTemplate = Object.keys(coins)
      .reverse()
      .map(
        type => `
        <div class="coin-holdings__item grid-item">${type}원</div>
        <div class="coin-holdings__item grid-item">${coins[type]}개</div>
      `,
      )
      .join('');

    return baseTemplate + coinsTemplate;
  }
}
