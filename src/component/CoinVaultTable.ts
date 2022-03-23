export class CoinVaultTable {
  constructor() {}

  templates(): string {
    return `
      <div>
        <h2>자판기가 보유한 동전</h2>
        <table>
          <thead>
            <tr>
              <th>동전</th>
              <th>개수</th>
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
