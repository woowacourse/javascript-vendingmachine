interface ProductManagerInterface {
  addProduct(product: Product): void;
}

interface Product {
  name: string;
  price: number;
  quantity: number;
}

class ProductManager implements ProductManagerInterface {
  private products: Product[] = [];

  addProduct(newProduct: Product) {
    // 중복체크
    this.products.push(newProduct);
    console.log(this.products);
  }
}

export default ProductManager;
