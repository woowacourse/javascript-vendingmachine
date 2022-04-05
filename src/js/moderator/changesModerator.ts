import ChangePageView from "../ui/changePageView";
import { on } from "../util/event";
import { EVENT_TYPE } from "../constant";
import { IChargeChangesEvent } from "../type";
import VendingMachine from "../domain/vendingMachine";

class ChangesModerator {
  changePageView;
  changeProcessMachine;
  vendingMachine;

  constructor() {
    this.changePageView = new ChangePageView();
    on<IChargeChangesEvent>(window, EVENT_TYPE.CHARGE, (e) =>
      this.chargeChange(e.detail)
    );
    this.vendingMachine = VendingMachine.getInstance();
  }

  init(): void {
    this.changePageView.init();
    const changes = this.vendingMachine.getTotalChanges();
    const coinStatus = this.vendingMachine.getCoins();
    this.changePageView.renderCurrentChanges(changes);
    this.changePageView.renderCoinStatus(coinStatus);
  }

  chargeChange = ({ money }: IChargeChangesEvent): void => {
    try {
      this.vendingMachine.chargeChanges(money);
      const changes = this.vendingMachine.getTotalChanges();
      const coinStatus = this.vendingMachine.getCoins();

      this.changePageView.renderCurrentChanges(changes);
      this.changePageView.renderCoinStatus(coinStatus);
    } catch (err) {
      alert(err.message);
    }
  };
}

export default ChangesModerator;
