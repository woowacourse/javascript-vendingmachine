import Product from '../domains/product';
import vendingMachineStore from '../stores/vendingMachineStore';
import { VENDING_MACHINE_STATE_KEYS } from '../utils/constants';

export const addProduct = ({ name, price, quantity }) => {
  const productList = vendingMachineStore.getState(VENDING_MACHINE_STATE_KEYS.PRODUCT_LIST);
  const product = new Product(name, price, quantity);

  vendingMachineStore.setState(VENDING_MACHINE_STATE_KEYS.PRODUCT_LIST, [...productList, product]);
};

export const editProduct = ({ id, name, price, quantity }) => {
  vendingMachineStore.setState(VENDING_MACHINE_STATE_KEYS.PRODUCT_LIST, productList => {
    const productToEdit = productList.find(product => product.getProductInfo().id === id);

    productToEdit.editProductInfo({ name, price, quantity });

    return productList;
  });
};

export const deleteProduct = ({ id }) => {
  const productList = vendingMachineStore.getState(VENDING_MACHINE_STATE_KEYS.PRODUCT_LIST);

  const deletedProductList = productList.filter(product => {
    const { id: productId } = product.getProductInfo();
    return productId !== id;
  });

  vendingMachineStore.setState(VENDING_MACHINE_STATE_KEYS.PRODUCT_LIST, deletedProductList);
};

export const rechargeCoin = ({ changeInput }) => {
  vendingMachineStore.setState(VENDING_MACHINE_STATE_KEYS.COIN_WALLET, coinWallet => {
    coinWallet.rechargeCoinWallet(changeInput);
    return coinWallet;
  });
};

export const inputMoney = ({ moneyInput }) => {
  vendingMachineStore.setState(
    VENDING_MACHINE_STATE_KEYS.INPUT_CHARGE,
    money => money + moneyInput,
  );
};

export const purchaseProduct = ({ productId }) => {
  const moneyInput = vendingMachineStore.getState(VENDING_MACHINE_STATE_KEYS.INPUT_CHARGE);
  const productList = vendingMachineStore.getState(VENDING_MACHINE_STATE_KEYS.PRODUCT_LIST);

  const productToPurchase = productList.find(product => product.getProductInfo().id === productId);

  const { price } = productToPurchase.getProductInfo();

  // 객체 데이터가 직접 변경된다.
  productToPurchase.purchaseProduct(moneyInput);

  vendingMachineStore.setState(VENDING_MACHINE_STATE_KEYS.PRODUCT_LIST, productList);
  vendingMachineStore.setState(VENDING_MACHINE_STATE_KEYS.INPUT_CHARGE, moneyInput - price);
};

export const returnCoin = () => {
  const returnCoinWallet = vendingMachineStore.getState(VENDING_MACHINE_STATE_KEYS.RETURN_COIN);
  const moneyInput = vendingMachineStore.getState(VENDING_MACHINE_STATE_KEYS.INPUT_CHARGE);
  const coinWallet = vendingMachineStore.getState(VENDING_MACHINE_STATE_KEYS.COIN_WALLET);

  const returnCoinInfo = coinWallet.returnChangeCoinInfo(moneyInput);

  returnCoinWallet.setCoinWalletInfo(returnCoinInfo);

  vendingMachineStore.setState(VENDING_MACHINE_STATE_KEYS.RETURN_COIN, returnCoinWallet);
  vendingMachineStore.setState(
    VENDING_MACHINE_STATE_KEYS.INPUT_CHARGE,
    moneyInput - returnCoinWallet.computeCoinTotalAmount(),
  );
  vendingMachineStore.setState(VENDING_MACHINE_STATE_KEYS.COIN_WALLET, coinWallet);
};
