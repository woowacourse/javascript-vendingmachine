import ProductProcessMachine from "./ProductProcessMachine";

describe("상품 관리하는 도메인 테스트", () => {
  test("상품명, 가격, 수량을 입력해 상품을 추가할 수 있다.", () => {
    const productProcessMachine = new ProductProcessMachine();
    productProcessMachine.add({ name: "호프", price: 110, count: 2 });
    productProcessMachine.add({ name: "스밍", price: 9990, count: 1 });

    expect(productProcessMachine.getProducts()).toStrictEqual([
      { name: "호프", price: 110, count: 2 },
      { name: "스밍", price: 9990, count: 1 },
    ]);
  });

  test("상품명은 최대 10글자이상일 경우 에러를 던진다", () => {
    const productProcessMachine = new ProductProcessMachine();
    expect(() => {
      productProcessMachine.add({
        name: "스밍스밍스밍스밍스밍스밍",
        price: 100,
        count: 1,
      });
    }).toThrowError("상품명은 10자이하로 입력해주세요");
  });

  test("상품명이 중복되면 에러를 던진다", () => {
    const productProcessMachine = new ProductProcessMachine();

    expect(() => {
      productProcessMachine.add({ name: "호프", price: 110, count: 2 });
      productProcessMachine.add({ name: "호프", price: 110, count: 2 });
    }).toThrowError("중복된 상품은 입력 할 수 없습니다.");
  });

  test("상품가격이 유효하지 않는다면 에러를 던진다.", () => {
    const productProcessMachine = new ProductProcessMachine();
    expect(() => {
      productProcessMachine.add({
        name: "호프",
        price: 90,
        count: 1,
      });
    }).toThrowError("유효한 가격을 입력해주세요");

    expect(() => {
      productProcessMachine.add({
        name: "스밍",
        price: 10010,
        count: 1,
      });
    }).toThrowError("유효한 가격을 입력해주세요");

    expect(() => {
      productProcessMachine.add({
        name: "스밍",
        price: 9999,
        count: 1,
      });
    }).toThrowError("유효한 가격을 입력해주세요");
  });

  test("한 제품의 수량이 20개 이상일 경우 에러를 던진다.", () => {
    const productProcessMachine = new ProductProcessMachine();

    expect(() => {
      productProcessMachine.add({
        name: "호오프",
        price: 2000,
        count: 0,
      });
    }).toThrowError("추가하는 수량은 0이하가 될수가 없습니다.");
    expect(() => {
      productProcessMachine.add({
        name: "호오프",
        price: 2000,
        count: 21,
      });
    }).toThrowError("수량은 최대 20개까지 추가 가능합니다.");
  });

  test("제품의 정보를 수정 할 수 있다.", () => {
    const productProcessMachine = new ProductProcessMachine();
    productProcessMachine.add({ name: "호프", price: 110, count: 2 });
    productProcessMachine.add({ name: "스밍", price: 9990, count: 1 });

    productProcessMachine.update(0, "밝아진 호프", null, 4);
    expect(productProcessMachine.getProducts()[0]).toStrictEqual({
      name: "밝아진 호프",
      price: 110,
      count: 4,
    });
  });

  test("제품을 삭제할수 있다.", () => {
    const productProcessMachine = new ProductProcessMachine();
    productProcessMachine.add({ name: "호프", price: 110, count: 2 });
    productProcessMachine.add({ name: "스밍", price: 9990, count: 1 });

    productProcessMachine.delete(0);
    expect(productProcessMachine.getProducts()).toStrictEqual([
      { name: "스밍", price: 9990, count: 1 },
    ]);
  });
});
