import Component from '../../core/Component';
import '../components/ItemAddForm';
import '../components/ItemTable';

class ItemManagementPage extends Component {
  template() {
    return `
      <section>
        <h2 hidden>추가할 상품 정보</h2>
        <add-form></add-form>
      </section>
      <section>
        <h2 class="table-title">상품 현황</h2>
        <item-table></item-table>
      </section>
    `;
  }
}

customElements.define('item-management', ItemManagementPage);
