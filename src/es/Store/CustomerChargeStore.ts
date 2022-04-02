import { IStore } from './Interface';

interface ICustomerChargeStore {
  customerCharge: number
}

class CustomerChargeStore implements IStore {
  private state: ICustomerChargeStore = {
    customerCharge: 0,
  };

  private subscribers = [];

  addSubscriber(subscriber: object) {
    this.subscribers.push(subscriber);
  }

  setState(newState: ICustomerChargeStore) {
    const changeStates: Array<string> = Object.entries(newState).map(([key]) => key);

    this.state = { ...this.state, ...newState };
    this.subscribers.forEach(renderMethod => renderMethod({ state: this.state, changeStates }));
  }

  getState(): ICustomerChargeStore {
    return { ...this.state };
  }

  addCharge(chargeToAdd: number) {
    const updatedCharge: number = this.state.customerCharge + chargeToAdd;
    this.setState({
      customerCharge: updatedCharge,
    });
  }

  subtractCharge(chargeToSubtract: number) {
    if (this.state.customerCharge < chargeToSubtract) {
      throw new Error('Insufficient customer customerCharge!');
    }
    const updatedCharge: number = this.state.customerCharge - chargeToSubtract;
    this.setState({
      customerCharge: updatedCharge,
    });
  }
}

export default new CustomerChargeStore();
