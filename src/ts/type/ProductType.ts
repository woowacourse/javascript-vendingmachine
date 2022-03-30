export default interface ProductType {
  name: string;
  price: number;
  quantity: number;
  setProduct?({ name, price, quantity }: ProductType): void;
}
