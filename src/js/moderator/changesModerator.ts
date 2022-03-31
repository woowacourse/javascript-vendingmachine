import ChangePageView from "../ui/changePageView";
import ChangeProcessMachine from "../domain/changesProcessMachine";
import { on } from "../util/event";
import { EVENT_TYPE } from "../constant";
import { IChargeChangesEvent } from "../type";

class ChangesModerator {
  changePageView;
  changeProcessMachine;

  constructor() {
    this.changePageView = new ChangePageView();
    this.changeProcessMachine = new ChangeProcessMachine();
    on<IChargeChangesEvent>(window, EVENT_TYPE.CHARGE, (e) =>
      this.chargeChange(e.detail)
    );
  }

  init(): void {
    this.changePageView.init();
    const changes = this.changeProcessMachine.getTotalChanges();
    const coinStatus = this.changeProcessMachine.getCoins();
    this.changePageView.renderCurrentChanges(changes);
    this.changePageView.renderCoinStatus(coinStatus);
  }

  chargeChange = ({ money }: IChargeChangesEvent): void => {
    try {
      this.changeProcessMachine.charge(money);
      const changes = this.changeProcessMachine.getTotalChanges();
      const coinStatus = this.changeProcessMachine.getCoins();

      this.changePageView.renderCurrentChanges(changes);
      this.changePageView.renderCoinStatus(coinStatus);
    } catch (err) {
      alert(err.message);
    }
  };
}

export default ChangesModerator;
