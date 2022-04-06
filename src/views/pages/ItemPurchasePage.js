import Component from '../../core/Component';
import '../components/InsertMoneyForm';
import '../components/InsertedMoneyIndicator';
import '../components/PurchasableItemTable';
import '../components/ReturnedChangeTable';

class ItemPurchasePage extends Component {
  template() {
    return `
      <section>
        <h2 hidden>잔돈 충전</h2>
        <insert-form></insert-form>
        <inserted-money></inserted-money>
      </section>
      <section>
        <h2 class="table-title">구매 가능 상품 현황</h2>
        <purchasable-table></purchasable-table>
      </section>
      <section>
        <h2 class="table-title">잔돈 반환</h2>
        <change-table></change-table>
      </section>
    `;
  }
}

customElements.define('item-purchase', ItemPurchasePage);
