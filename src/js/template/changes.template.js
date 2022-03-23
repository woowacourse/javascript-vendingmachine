const changesTemplate = {
  input: () => `
    <form id="changes-form" class="form">
      <label for="changes-input">자판기가 보유할 금액을 입력해주세요</label>
      <div class="input-container">
        <input id="changes-input" class="input" placeholder="금액" type="number">
        <button id="charge-changes-button" class="button">충전</button>
      </div>
      <p id="have-changes"></p>
    </form>
  `,

  changesTable: () => `
  <section>
    <h2>자판기가 보유한 동전</h2>

    <table>
      <thead>
        <tr>
          <th>동전</th>
          <th>개수</th>
        </tr>
      </thead>
      <tbody id="changes-table-body">

      </tbody>
    </table>
  </section>
  `,

  changeStatus: (coinStatus) => `
    <tr>
      <td>500원</td>
      <td>${coinStatus["500"]}</td>
    </tr>
    <tr>
      <td>100원</td>
      <td>${coinStatus["100"]}</td>
    </tr>
    <tr>
      <td>50원</td>
      <td>${coinStatus["50"]}</td>
    </tr>
    <tr>
      <td>10원</td>
      <td>${coinStatus["10"]}</td>
    </tr>
  `,
};

export default changesTemplate;
