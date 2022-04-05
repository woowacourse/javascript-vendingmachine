import Store from './Abstract';

class ProductStore extends Store<ProductStoreState> {
  protected state: ProductStoreState = {
    products: [],
  };

  addProduct(product: Product): void {
    this.setState({
      products: [...this.state.products, product],
    });
  }

  updateProduct(index: number, replaceProduct: Product = null): void {
    const updateProduct = [...this.state.products];
    replaceProduct
      ? updateProduct.splice(index, 1, replaceProduct)
      : updateProduct.splice(index, 1);

    this.setState({
      products: updateProduct,
    });
  }

  findProductIndexByName(name: string): number {
    return this.state.products.findIndex(product => product.name === name);
  }
}

export default new ProductStore();
