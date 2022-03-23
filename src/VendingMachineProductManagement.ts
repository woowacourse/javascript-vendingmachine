interface product {
  name: string;
  price: number;
  quantity: number;
}

interface ProductManagement {
  addProduct(newProduct: product): void;
  getProducts(): product[];
  editProduct(name: string, edittedProduct: product): void;
  deleteProduct(name: string): void;
}

class VendingMachineProductManagement implements ProductManagement {
  private products: product[] = [];

  addProduct() {}

  getProducts() {}

  editProduct() {}

  deleteProduct() {}
}
