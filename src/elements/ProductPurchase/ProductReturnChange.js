import CustomElement from '../../abstracts/CustomElement';
import { $ } from '../../utils/dom';
import CoinStoreInstance from '../../domains/stores/CoinStore';
import { COIN_ACTION } from '../../domains/actions';
import { SUCCESS } from '../../constants';
import showSnackbar from '../../utils/showSnackbar';

class ProductReturnChange extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    CoinStoreInstance.subscribe(this);
  }

  template() {
    return `
      <h2>잔돈 반환</h2>
      <table class="product-return-change-state">
        <thead>
          <tr>
            <th>동전</th>
            <th>개수</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>500원</td>
            <td class="change-500-count-td">0개</td>
          </tr>
          <tr>
            <td>100원</td>
            <td class="change-100-count-td">0개</td>
          </tr>
          </tr>
          <tr>
            <td>50원</td>
            <td class="change-50-count-td">0개</td>
          </tr>
          <tr>
            <td>10원</td>
            <td class="change-10-count-td">0개</td>
          </tr>
        </tbody>
      </table>
      <button class="product-return-change-button">반환</button>
    `;
  }

  setEvent() {
    $('.product-return-change-button').addEventListener('click', this.handleReturnChangeButtonClick);
  }

  handleReturnChangeButtonClick = () => {
    showSnackbar(SUCCESS.RETURN_CHANGE);
    const oldCoinsCount = CoinStoreInstance.coinsCount;
    CoinStoreInstance.dispatchAction(COIN_ACTION.RETURN_CHANGE, oldCoinsCount);
  };

  rerender(newCoinsCount, action) {
    if (action.type !== COIN_ACTION.RETURN_CHANGE) return;
    const oldCoinsCount = action.detail;
    const returnCoinCount = {
      500: oldCoinsCount[500] - newCoinsCount[500],
      100: oldCoinsCount[100] - newCoinsCount[100],
      50: oldCoinsCount[50] - newCoinsCount[50],
      10: oldCoinsCount[10] - newCoinsCount[10],
    };
    const $productReturnChangeTable = $('.product-return-change-state');
    $('.change-500-count-td', $productReturnChangeTable).textContent = `${returnCoinCount[500]}개`;
    $('.change-100-count-td', $productReturnChangeTable).textContent = `${returnCoinCount[100]}개`;
    $('.change-50-count-td', $productReturnChangeTable).textContent = `${returnCoinCount[50]}개`;
    $('.change-10-count-td', $productReturnChangeTable).textContent = `${returnCoinCount[10]}개`;
  }
}

customElements.define('product-return-change', ProductReturnChange);

export default ProductReturnChange;
