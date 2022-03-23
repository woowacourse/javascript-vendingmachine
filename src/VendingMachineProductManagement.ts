export interface product {
  name: string;
  price: number;
  quantity: number;
}

interface ProductManagement {
  addProduct(newProduct: product): void;
  getProducts(): product[];
  editProduct(name: string, targetProduct: product): void;
  deleteProduct(name: string): void;
}

export default class VendingMachineProductManagement
  implements ProductManagement
{
  private products: product[] = [];

  addProduct(newProduct) {
    this.products.push(newProduct);
  }

  getProducts() {
    return this.products;
  }

  editProduct(editProductName, targetProduct) {
    const editIndex = this.products.findIndex(
      (product) => product.name === editProductName
    );

    this.products.splice(editIndex, 1, targetProduct);
  }

  deleteProduct(deleteProductName) {
    this.products = this.products.filter(
      (product) => product.name !== deleteProductName
    );
  }
}
