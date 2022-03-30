import { PRODUCT, CHARGE } from "./constants";

const validateProductName = (productName: string | null) => {
  if (productName.trim() === "") {
    throw new Error("상품명을 입력해주세요.");
  }

  if (productName.length > PRODUCT.MAX_LENGTH) {
    throw new Error(
      `상품명은 최대 ${PRODUCT.MAX_LENGTH}글자까지 입력 가능합니다.`
    );
  }
};

const validateProductPrice = (productPrice: number | null) => {
  if (typeof productPrice !== "number") {
    throw new Error("값을 모두 입력해주세요.");
  }

  if (productPrice < PRODUCT.MIN_PRICE || productPrice > PRODUCT.MAX_PRICE) {
    throw new Error(
      `상품 가격은 ${PRODUCT.MIN_PRICE}원부터, 최대 ${PRODUCT.MAX_PRICE}원까지 가능합니다.`
    );
  }

  if (productPrice % PRODUCT.UNIT !== 0) {
    throw new Error(`상품 가격은 ${PRODUCT.UNIT}원으로 나누어 떨어져야합니다.`);
  }
};

const valudateProductQuantity = (productQuantity: number | null) => {
  if (
    productQuantity > PRODUCT.MAX_QUANTITY ||
    productQuantity < PRODUCT.MIN_QUANTITY
  ) {
    throw new Error(
      `제품당 수량은 최소 ${PRODUCT.MAX_QUANTITY}개부터 최대 ${PRODUCT.MIN_QUANTITY}개까지 가능합니다.`
    );
  }

  if (productQuantity - Math.floor(productQuantity)) {
    throw new Error("제품의 수량은 소수점으로 입력할 수 없습니다.");
  }
};

const validateSameProductName = (productName: string, productNameList: string[]) => {
  if (productNameList.includes(productName)) {
    throw new Error("같은 이름의 제품은 등록할 수 없습니다.");
  }
};

const verifyCharge = (charge: number | null) => {
  if (charge < CHARGE.MIN_PRICE || charge > CHARGE.MAX_PRICE) {
    throw new Error(
      `최소 ${CHARGE.MIN_PRICE}원, 최대 ${CHARGE.MAX_PRICE}원까지 충전할 수 있습니다.`
    );
  }

  if (charge % CHARGE.UNIT !== 0) {
    throw new Error(
      `잔돈은 ${CHARGE.UNIT}원으로 나누어 떨어지는 금액만 투입할 수 있습니다.`
    );
  }

  if (!charge) {
    throw new Error("금액을 입력해주세요.");
  }
};

export { 
  validateProductName,
  validateProductPrice,
  valudateProductQuantity,
  validateSameProductName,
  verifyCharge
};
