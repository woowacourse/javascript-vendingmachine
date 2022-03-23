export class ProductCatalogTable {
  constructor() {}

  templates(): string {
    return `
      <div>
        <h2>상품 현황</h2>
        <table>
          <thead>
            <tr>
              <th>상품명</th>
              <th>가격</th>
              <th>수량</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    `;
  }

  render(target: HTMLDivElement) {
    target.insertAdjacentHTML('beforeend', this.templates());
  }

  register() {}
}
