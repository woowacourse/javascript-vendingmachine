import ChangePageView from "../ui/changePageView";
import { on } from "../util/event";
import { EVENT_TYPE } from "../constant";
import { IChargeChangesEvent } from "../type";
import VendingMachine from "../domain/vendingMachine";
import Authorization from "../domain/authorization";

class ChangesModerator {
  changePageView;
  authorization;
  changeProcessMachine;
  vendingMachine;

  constructor() {
    this.authorization = new Authorization();
    this.changePageView = new ChangePageView();
    on<IChargeChangesEvent>(window, EVENT_TYPE.CHARGE, (e) =>
      this.chargeChange(e.detail)
    );
    this.vendingMachine = VendingMachine.getInstance();
  }

  async init() {
    const userInfo = await this.authorization.isLoggedIn();

    if (userInfo.isError) {
      alert("권한이 없습니다.");
      location.href = "/";
      return;
    }
    this.changePageView.init();
    const changes = this.vendingMachine.getTotalChanges();
    const coinStatus = this.vendingMachine.getCoins();
    this.changePageView.renderCurrentChanges(changes);
    this.changePageView.renderCoinStatus(coinStatus);
    this.changePageView.renderHeader(userInfo);
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
