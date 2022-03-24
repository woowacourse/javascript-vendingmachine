import Component from '../abstract/component';
import { customElement, event } from '../decorators/decortators';

@customElement('product-manage-tab')
class ProductManageTab extends Component {
  template(): string {
    return '<button class="my-button">CLICK ME</button>';
  }

  @event('click', '.my-button')
  onClickButton() {}
}

export default ProductManageTab;
