import { PRODUCT } from "./constants";

const verifyProductInfo = (
  productName: string | null,
  productPrice: number | null,
  productQuantity: number | null,
  productNameList: string[] | null
) => {
  if (productNameList.includes(productName)) {
    throw new Error("중복된 상품명은 등록할 수 없습니다.");
  }
  if (productName.trim() === "" || typeof productPrice !== "number") {
    throw new Error("값을 모두 입력해주세요.");
  }
  if (productName.length > PRODUCT.MAX_LENGTH) {
    throw new Error("상품명은 최대 10글자까지 입력 가능합니다.");
  }
  if (productPrice < PRODUCT.MIN_PRICE || productPrice > PRODUCT.MAX_PRICE) {
    throw new Error("상품 가격은 100원부터, 최대 10,000원까지 가능합니다.");
  }
  if (productPrice % PRODUCT.UNIT !== 0) {
    throw new Error("상품 가격은 10원으로 나누어 떨어져야합니다.");
  }
  if (
    productQuantity > PRODUCT.MAX_QUANTITY ||
    productQuantity < PRODUCT.MIN_QUANTITY
  ) {
    throw new Error("제품당 수량은 최소 1개부터 최대 20개까지 가능합니다.");
  }
  if (productQuantity - Math.floor(productQuantity)) {
    throw new Error("제품의 수량은 소수점으로 입력할 수 없습니다.");
  }
};

export { verifyProductInfo };
