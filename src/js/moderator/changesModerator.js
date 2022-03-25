import ChangePageView from "../ui/changePageView";
import ChangeProcessMachine from "../domain/changesProcessMachine";
import { addEvent } from "../util/event";
import { EVENT_TYPE } from "../constant";

class ChangesModerator {
  constructor() {
    this.$page = document.querySelector("#page");
    this.changePageView = new ChangePageView(this.$page);
    this.changeProcessMachine = new ChangeProcessMachine();
    addEvent(this.$page, EVENT_TYPE.CHARGE, (e) => this.chargeChange(e.detail));
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
