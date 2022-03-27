import { Product } from '../../index.d';

const checkProduct = ({ name, price, quantity }: Product): void => {
  if (name === '') throw new Error('상품명을 입력해주세요!');
  if (name.length > 10) throw new Error('상품명은 1이상 10이하로 입력해주세요!');
  if (price < 100 || price > 10000) throw new Error('상품 가격은 100이상 10000이하로 입력해주세요!');
  if (price % 10 > 0) throw new Error('상품 가격은 10의 배수로 입력해주세요!');
  if (quantity < 1 || quantity > 20) throw new Error('상품 수량은 1이상 20이하로 입력해주세요!');
};

const validator = {
  checkAdditionalProduct(product: Product, products: Array<Product>) {
    checkProduct(product);
    
    if (products.some(({ name }) => name === product.name)) throw new Error('이미 존재하는 상품입니다!');
  },
};

export default validator;
