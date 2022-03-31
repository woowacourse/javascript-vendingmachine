import Vendingmachine from "../ts/components/Vendingmachine";
import Charge from "../ts/components/charge/Charge";
describe("자판기 동전 충전 테스트", () => {
  new Vendingmachine();
  const charge = new Charge();
  test("자판기에 금액을 충전하면 ", () => {
    const inputCharge = 40;
    charge.render();
    charge.convertRandomCharge(inputCharge);
    console.log(charge.coinsKindCount);
  });
})