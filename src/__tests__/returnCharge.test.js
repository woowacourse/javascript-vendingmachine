describe("잔돈 반환", () => {

  test("최소한의 개수로 잔돈을 반환해야 한다", () => {
    const vendinMachineContainCoins = { 10: 20, 50: 10, 100: 3, 500: 2 };
    const vendingMachineReturnCoins = { 10: 0, 50: 0, 100: 0, 500: 0 };
    const expectMachineReturnCoins = [0, 1, 0, 1];
    let vendingMachineContainMoney = 550;
    let vendingMachineReturnMoney = 0;

    calculateReturns({
      vendinMachineContainCoins,
      vendingMachineReturnCoins,
      vendingMachineContainMoney,
      vendingMachineReturnMoney
    });

    Object.values(vendingMachineReturnCoins)
      .forEach((coinTypeResult, index) => expect(coinTypeResult).toEqual(expectMachineReturnCoins[index]));
  });

  test("지폐는 잔돈으로 반환하지 않는다", () => {
    const vendinMachineContainCoins = { 10: 20, 50: 10, 100: 3, 500: 2 };
    const vendingMachineReturnCoins = { 10: 0, 50: 0, 100: 0, 500: 0 };
    const expectMachineReturnCoins = [0, 1, 0, 1];
    let vendingMachineContainMoney = 1550;
    let vendingMachineReturnMoney = 0;

    calculateReturns({
      vendinMachineContainCoins,
      vendingMachineReturnCoins,
      vendingMachineContainMoney,
      vendingMachineReturnMoney
    });

    Object.values(vendingMachineReturnCoins)
      .forEach((coinTypeResult, index) => expect(coinTypeResult).toEqual(expectMachineReturnCoins[index]));
  })

  test("잔돈을 반환할 수 없는 경우 반환할 수 있는 금액만 반환한다", () => {
    const vendinMachineContainCoins = { 10: 4, 50: 0, 100: 3, 500: 2 };
    const vendingMachineReturnCoins = { 10: 0, 50: 0, 100: 0, 500: 0 };
    const expectMachineReturnCoins = [4, 0, 0, 1];
    let vendingMachineContainMoney = 550;
    let vendingMachineReturnMoney = 0;

    calculateReturns({
      vendinMachineContainCoins,
      vendingMachineReturnCoins,
      vendingMachineContainMoney,
      vendingMachineReturnMoney
    });
    
    Object.values(vendingMachineReturnCoins)
      .forEach((coinTypeResult, index) => expect(coinTypeResult).toEqual(expectMachineReturnCoins[index]));
  })
});

const calculateReturns = ({ 
      vendinMachineContainCoins,
      vendingMachineReturnCoins,
      vendingMachineContainMoney,
      vendingMachineReturnMoney
  }) => {

  if (vendingMachineContainMoney >= 1000) {
    vendingMachineReturnMoney = vendingMachineContainMoney % 1000;
    vendingMachineContainMoney -= vendingMachineReturnMoney;
  } else if (vendingMachineContainMoney < 1000) {
    vendingMachineReturnMoney = vendingMachineContainMoney;
    vendingMachineContainMoney -= vendingMachineReturnMoney;
  }

  while(vendingMachineReturnMoney !== 0) {
    if (vendingMachineReturnMoney >= 500 && vendinMachineContainCoins[500] > 0) {
      vendingMachineReturnMoney -= 500;
      vendinMachineContainCoins[500] -= 1;
      vendingMachineReturnCoins[500] += 1;
    } else if (vendingMachineReturnMoney >= 100 && vendinMachineContainCoins[100] > 0) {
      vendingMachineReturnMoney -= 100;
      vendinMachineContainCoins[100] -= 1;
      vendingMachineReturnCoins[100] += 1;
    } else if (vendingMachineReturnMoney >= 50 && vendinMachineContainCoins[50] > 0) {
      vendingMachineReturnMoney -= 50;
      vendinMachineContainCoins[50] -= 1;
      vendingMachineReturnCoins[50] += 1;
    } else if (vendingMachineReturnMoney >= 10) { 
      if (vendinMachineContainCoins[10] > 0) {
        vendingMachineReturnMoney -= 10;
        vendinMachineContainCoins[10] -= 1;
        vendingMachineReturnCoins[10] += 1;
      } else if (vendinMachineContainCoins[10] === 0) {
        break;
      }
    }
  }
};
