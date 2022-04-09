import { PRODUCT, CHARGE, specialSymbolAsc, numberAsc, upperCaseAsc, lowerCaseAsc } from "./constants";
import { EditInsertMoneyProps, ValidateNameInfoProps, ValidatePasswordConfirmInfoProps, ValidatePasswordInfoProps } from "./interface";

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
      `제품당 수량은 최소 ${PRODUCT.MIN_QUANTITY}개부터 최대 ${PRODUCT.MAX_QUANTITY}개까지 가능합니다.`
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

const validateCharge = (charge: number | null) => {
  if (charge < CHARGE.MIN_PRICE || charge > CHARGE.MAX_PRICE) {
    throw new Error(
      `최소 ${CHARGE.MIN_PRICE}원, 최대 ${CHARGE.MAX_PRICE}원까지 투입할 수 있습니다.`
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

const validatePossiblePurchaseProduct = ({ totalMoney, productPrice }: EditInsertMoneyProps) => {
  if (totalMoney < productPrice) {
    throw new Error("보유한 금액이 부족합니다. 구매를 원하시면 금액을 더 투입해주세요.")
  }
};

const validateEmailInfo = (emailInputValue, emailInfoMessage): Boolean => {
  const emailInfoSplit = emailInputValue.split("");
  const emailInfoSplitAt = emailInputValue.split("@");

  try {
    if (!emailInputValue) {
      throw Error("필수 정보입니다.");
    }
    if (!emailInfoSplit.includes("@")) {
      throw Error("이메일 입력값에는 @가 필수입니다.");
    }
    if (emailInfoSplit.filter((text) => text === "@").length > 1) {
      throw Error("@ 다음 부분에 @기호를 포함할 수 없습니다.");
    }
    if (emailInfoSplitAt[0].length === 0) {
      throw Error("@ 앞부분을 입력해주세요.");
    }
    if (emailInfoSplitAt[1].length < 1) {
      throw Error("@ 뒷부분을 입력해주세요.");
    }
    if (emailInfoSplit.find((text) => text === " ")) {
      throw Error("이메일에 공백을 포함할 수 없습니다.");
    }
    return true;
  } catch ({ message }) {
    emailInfoMessage.textContent = `${message}`;
    return false;
  }
};

const validateNameInfo = ({ nameInputValue, nameInfoMessage }: ValidateNameInfoProps): Boolean => {
  const numberInputValueSplit = nameInputValue.split("");

  try {
    if (!nameInputValue) {
      throw Error("필수 정보입니다.");
    }
    if (numberInputValueSplit.find((_, index: number) => specialSymbolAsc.includes(nameInputValue.charCodeAt(index)))) {
      throw Error("한글과 영문을 입력해주세요. (특수기호, 숫자, 공백 사용 불가)");
    }
    if (numberInputValueSplit.find((_, index: number) => numberAsc.includes(nameInputValue.charCodeAt(index)))) {
      throw Error("한글과 영문을 입력해주세요. (특수기호, 숫자, 공백 사용 불가)");
    }
    if (numberInputValueSplit.find((text: string) => text === " ")) {
      throw Error("한글과 영문을 입력해주세요. (특수기호, 숫자, 공백 사용 불가)");
    }
    return true;
  } catch ({ message }) {
    nameInfoMessage.textContent = `${message}`;
    return false;
  }
};

const validatePasswordInfo = ({ passwordInputValue, passwordInfoMessage }: ValidatePasswordInfoProps): Boolean => {
  const validatePasswordInfoSplit = passwordInputValue.split("");

  try {
    if (!passwordInputValue) {
      throw Error("필수 정보입니다.");
    }
    if (validatePasswordInfoSplit.find((text) => text === " ")) {
      throw Error("비밀번호에 공백을 포함할 수 없습니다.");
    }
    if (validatePasswordInfoSplit.find((_, index) => specialSymbolAsc.includes(passwordInputValue.charCodeAt(index)))) {
      throw Error("8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.");
    }
    if (!validatePasswordInfoSplit.find((_, index) => upperCaseAsc.includes(passwordInputValue.charCodeAt(index)))) {
      throw Error("8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.");
    }
    if (!validatePasswordInfoSplit.find((_, index) => lowerCaseAsc.includes(passwordInputValue.charCodeAt(index)))) {
      throw Error("8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.");
    }
    if (!validatePasswordInfoSplit.find((_, index) => numberAsc.includes(passwordInputValue.charCodeAt(index)))) {
      throw Error("8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.");
    }

    return true;
  } catch ({ message }) {
    passwordInfoMessage.textContent = `${message}`;

    return false;
  }
};

const validatePasswordConfirmInfo = ({ passwordConfirmInputValue, passwordInputValue, passwordConfirmInfoMessage }: ValidatePasswordConfirmInfoProps): Boolean => {
  try {
    if (!passwordConfirmInputValue) {
      throw Error("필수 정보입니다.");
    }
    if (passwordInputValue !== passwordConfirmInputValue) {
      throw Error("비밀번호가 일치하지 않습니다.");
    }
    return true;
  } catch ({ message }) {
    passwordConfirmInfoMessage.textContent = `${message}`;
    return false;
  }
};

export { 
  validateProductName,
  validateProductPrice,
  valudateProductQuantity,
  validateSameProductName,
  validateCharge,
  validatePossiblePurchaseProduct,
  validateEmailInfo,
  validateNameInfo,
  validatePasswordInfo,
  validatePasswordConfirmInfo
};
