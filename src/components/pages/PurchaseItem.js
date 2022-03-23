import Component from '../../core/Component';

class PurchaseItem extends Component {
  template() {
    return `
      <div>
        <p>comming soon</p>
      </div>
    `;
  }
}

customElements.define('purchase-item', PurchaseItem);
