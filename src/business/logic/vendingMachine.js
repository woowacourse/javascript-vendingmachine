import Product from '../../domains/product.ts';
import vendingMachineStore from '../store/vendingMachineStore.ts';
import { VENDING_MACHINE_STATE_KEYS } from '../../utils/constants/index.ts';

export const addProduct = ({ name, price, quantity }) => {
  vendingMachineStore.setState(VENDING_MACHINE_STATE_KEYS.PRODUCT_LIST, productList => [
    ...productList,
    new Product(name, price, quantity),
  ]);
};

export const editProduct = ({ id, name, price, quantity }) => {
  vendingMachineStore.setState(VENDING_MACHINE_STATE_KEYS.PRODUCT_LIST, productList => {
    const productToEdit = productList.find(product => product.getProductInfo().id === id);

    productToEdit.editProductInfo({ name, price, quantity });

    return productList;
  });
};

export const deleteProduct = ({ id }) => {
  vendingMachineStore.setState(VENDING_MACHINE_STATE_KEYS.PRODUCT_LIST, productList => {
    return productList.filter(product => {
      const { id: productId } = product.getProductInfo();
      return productId !== id;
    });
  });
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

  vendingMachineStore.setState(
    VENDING_MACHINE_STATE_KEYS.INPUT_CHARGE,
    moneyInput - returnCoinWallet.computeCoinTotalAmount(),
  );
  vendingMachineStore.setState(VENDING_MACHINE_STATE_KEYS.COIN_WALLET, coinWallet);
  vendingMachineStore.setState(VENDING_MACHINE_STATE_KEYS.RETURN_COIN, returnCoinWallet);
};
