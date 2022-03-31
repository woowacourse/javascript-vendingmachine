import ChangePageView from "../ui/changePageView";
import ChangeProcessMachine from "../domain/changesProcessMachine";
import { on } from "../util/event";
import { EVENT_TYPE } from "../constant";

class ChangesModerator {
  constructor() {
    this.changePageView = new ChangePageView();
    this.changeProcessMachine = new ChangeProcessMachine();
    on(window, EVENT_TYPE.CHARGE, (e) => this.chargeChange(e.detail));
  }

  init = () => {
    this.changePageView.init();
    const changes = this.changeProcessMachine.getTotalChanges();
    const coinStatus = this.changeProcessMachine.getCoins();
    this.changePageView.renderCurrentChanges(changes);
    this.changePageView.renderChangeStatus(coinStatus);
  };

  chargeChange = ({ money }) => {
    try {
      this.changeProcessMachine.charge(money);
      const changes = this.changeProcessMachine.getTotalChanges();
      const coinStatus = this.changeProcessMachine.getCoins();

      this.changePageView.renderCurrentChanges(changes);
      this.changePageView.renderChangeStatus(coinStatus);
    } catch (err) {
      alert(err.message);
    }
  };
}

export default ChangesModerator;
