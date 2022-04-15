import Store from './Abstract';

class ProductStore extends Store {
  protected state = {
    products: [],
  };

  public addProduct(product: IProduct): void {
    this.setState({
      products: [...this.state.products, product],
    });
  }

  public updateProduct(index: number, replaceProduct: IProduct = null): void {
    const updateProduct = [...this.state.products];
    replaceProduct
      ? updateProduct.splice(index, 1, replaceProduct)
      : updateProduct.splice(index, 1);

    this.setState({
      products: updateProduct,
    });
  }

  public purchaseProduct(index: number): void {
    const updateProduct: IProduct = { ...this.state.products[index] };

    updateProduct.quantity -= 1;
    this.updateProduct(index, updateProduct);
  }

  public findProductIndexByName(name: string): number {
    return this.state.products.findIndex(product => product.name === name);
  }

  public isOutOfStock(index: number): boolean {
    const product: IProduct = this.state.products[index];
    return product.quantity <= 0;
  }
}

export default new ProductStore();
