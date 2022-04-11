import { COIN_TYPE, GUIDE_MESSAGE } from '../constants';
import CustomerCharge from '../state/CustomerCharge';
import Products from '../state/Products';
import VendingMachineCharge from '../state/VendingMachineCharge';
import { ProductInfo, PageManagerMethods, Coins } from '../interface';

interface ProductPurchaseState {
  products: Array<ProductInfo>,
  vendingMachineChargeCoins: Coins,
  customerChargeAmount: number,
}

class ProductPurchasePageManager implements PageManagerMethods {
  private subscribers = [];

  addSubscriber(subscriber: object) {
    this.subscribers.push(subscriber);
  }

  setState(newState: Partial<ProductPurchaseState>) {
    const changeStates: Array<string> = Object.keys(newState);

    const state = { ...this.getState(), ...newState };
    if (changeStates.includes('products')) Products.setProducts(newState.products);
    if (changeStates.includes('vendingMachineChargeCoins')) VendingMachineCharge.setCoins(newState.vendingMachineChargeCoins);
    if (changeStates.includes('customerChargeAmount')) CustomerCharge.setAmount(newState.customerChargeAmount);

    this.subscribers.forEach(renderMethod => renderMethod({ state, changeStates }));
  }

  getState(): ProductPurchaseState {
    return {
      products: Products.products,
      vendingMachineChargeCoins: VendingMachineCharge.coins,
      customerChargeAmount: CustomerCharge.amount,
    };
  }

  addCustomerCharge(chargeToAdd: number) {
    const updatedCharge: number = CustomerCharge.amount + chargeToAdd;
    this.setState({
      customerChargeAmount: updatedCharge,
    });
  }

  subtractCustomerCharge(chargeToSubtract: number) {
    if (CustomerCharge.amount < chargeToSubtract) {
      throw new Error('Insufficient customer customerCharge!');
    }
    const updatedCharge: number = CustomerCharge.amount - chargeToSubtract;
    this.setState({
      customerChargeAmount: updatedCharge,
    });
  }

  purchaseProductByIndex(index: number): string {
    const { name, price } = Products.products[index];
    if (price > CustomerCharge.amount) {
      throw new Error(GUIDE_MESSAGE.INSUFFICIENT_CHARGE_TO_PURCHASE);
    }
    this.subtractCustomerCharge(price);
    this.takeOutProductByIndex(index);
    return name;
  }

  takeOutProductByIndex(index: number, count = 1) {
    const updatedProduct = Products.products[index];
    updatedProduct.quantity -= count;

    const updatedProducts = [...Products.products];
    updatedProducts.splice(index, 1, updatedProduct);
    this.setState({
      products: updatedProducts,
    });
  }

  subtractVendingMachineChargeCoins(coinsToBeReturned: Coins) {
    const subtractedCoins: Coins
      = VendingMachineCharge.coins.map((coin, index) => coin - coinsToBeReturned[index]);
    this.setState({
      vendingMachineChargeCoins: subtractedCoins,
    });
  }

  calculateCoinsToBeReturned(): Coins {
    if (VendingMachineCharge.getTotalAmount() <= CustomerCharge.amount) {
      return VendingMachineCharge.coins;
    }

    const coinsToBeReturned = [0, 0, 0, 0];
    let leftCharge = CustomerCharge.amount;
    COIN_TYPE.forEach((coin, index) => {
      const maxQuantity = Math.floor(leftCharge / coin);
      const returnQuantity = maxQuantity > VendingMachineCharge.coins[index]
        ? VendingMachineCharge.coins[index] : maxQuantity;
      coinsToBeReturned[index] = returnQuantity;
      leftCharge -= returnQuantity * coin;
    });
    return coinsToBeReturned;
  }

  returnChanges(): Coins {
    const coinsToBeReturned = this.calculateCoinsToBeReturned();
    const amountToBeReturned = coinsToBeReturned.reduce(
      (previous, coin, index) => (previous += COIN_TYPE[index] * coin),
      0,
    );
    this.subtractCustomerCharge(amountToBeReturned);
    this.subtractVendingMachineChargeCoins(coinsToBeReturned);
    return coinsToBeReturned;
  }
}

export default new ProductPurchasePageManager();
