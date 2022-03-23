import ChangePageView from "../ui/changePageView";
import ChangeProcessMachine from "../domain/changesProcessMachine";
import { on } from "../util/event";

class ChangesModerator {
  constructor() {
    this.changePageView = new ChangePageView();
    this.changeProcessMachine = new ChangeProcessMachine();
    on(window, "@charge", (e) => this.chargeChange(e.detail));
  }

  init = () => {
    this.changePageView.renderInput();
    const changes = this.changeProcessMachine.getTotalChanges();
    const coinStatus = this.changeProcessMachine.getCoins();
    this.changePageView.renderChangesTable();
    this.changePageView.initDOM();
    this.changePageView.renderHaveChanges(changes);
    this.changePageView.renderChangeStatus(coinStatus);
  };

  chargeChange = ({ money }) => {
    try {
      this.changeProcessMachine.charge(money);
      const changes = this.changeProcessMachine.getTotalChanges();
      const coinStatus = this.changeProcessMachine.getCoins();

      this.changePageView.renderHaveChanges(changes);
      this.changePageView.renderChangeStatus(coinStatus);
    } catch (err) {
      alert(err.message);
    }
  };
}

export default ChangesModerator;
