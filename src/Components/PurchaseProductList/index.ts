import Component from 'Components/Abstract';
import ProductList from 'Components/@Shared/ProductList';
import ProductStore from 'Store/ProductStore';
import { validateProduct } from 'Utils/VendingMachine/validator';
import { snackbar } from 'Utils';

export default class PurchaseProductList extends Component {
  subscribeStore = [ProductStore];

  template() {
    const { handleProductUpdate, handleRemoveProduct } = this;

    return this.createChildComponent<IProductListProps>(ProductList, {
      caption: '구매 가능 상품 현황',
      listType: 'purchase',
      onProductUpdate: handleProductUpdate,
      onRemoveProduct: handleRemoveProduct,
    });
  }

  handleProductUpdate(productIndex: number, product: IProduct) {
    try {
      validateProduct(product);
    } catch (error) {
      snackbar(error.message, 'warning');
      return;
    }

    ProductStore.updateProduct(productIndex, product);
  }

  handleRemoveProduct(productIndex: number) {
    ProductStore.updateProduct(productIndex);
  }
}
