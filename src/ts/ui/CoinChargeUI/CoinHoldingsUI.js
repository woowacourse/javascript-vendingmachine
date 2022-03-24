import { $ } from '../../utils/dom';
import { replaceHTML } from '../../utils/dom';

export default class CoinHoldingsUI {
  constructor() {
    this.render();
  }

  render() {
    replaceHTML($('.coin-holdings__container'), this.template());
  }

  template() {
    const baseTemplate = `
      <div class="coin-holdings__item grid-item grid-header">동전</div>
      <div class="coin-holdings__item grid-item grid-header">개수</div>
      <div class="coin-holdings__item grid-item">500원</div>
      <div class="coin-holdings__item grid-item">0개</div>
      <div class="coin-holdings__item grid-item">100원</div>
      <div class="coin-holdings__item grid-item">0개</div>
      <div class="coin-holdings__item grid-item">50원</div>
      <div class="coin-holdings__item grid-item">0개</div>
      <div class="coin-holdings__item grid-item">10원</div>
      <div class="coin-holdings__item grid-item">0개</div>
    `;

    return baseTemplate;
  }
}
