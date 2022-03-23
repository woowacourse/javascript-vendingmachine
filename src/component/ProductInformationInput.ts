export class ProductInformationInput {
  constructor() {}

  templates(): string {
    return `
      <form>
          <label for="product-information-input">추가할 상품 정보를 입력해주세요</label>
          <div id="product-information-input">
            <input type="text" placeholder="상품명"></input>
            <input type="number" placeholder="가격"></input>
            <input type="number" placeholder="수량"></input>
            <button type="submit">추가</button>
          </div>
      </form>
    `;
  }

  render(target: HTMLDivElement) {
    target.insertAdjacentHTML('beforeend', this.templates());
  }

  register() {}
}
