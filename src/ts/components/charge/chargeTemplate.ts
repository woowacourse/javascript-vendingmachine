const chargeTemplate = `
  <section id="charge-control-section">
    <div>
      <form id="charge-control-form">
        <label>자판기가 보유할 금액을 입력해주세요.</label>
          <div>
            <input type="number" placeholder="금액" value="" class="charge-control-input" />
            <button type="submit" id="charge-add-button">충전</button>
          </div>
      </form>  
    </div>
    <div>
      <p>현재 보유 금액: <span id="current-contain-charge"></span>원</p>
    </div>
    <div>
      <h1 id="charge-table-title">자판기가 보유한 동전</h1>
      <table id="charge-control-table">
        <tr> 
          <th>동전</th>
          <th>개수</th>
        </tr>
        <tr>
          <td>500원</td>
          <td class="charge-coin-count">0개</td>
        </tr>
        <tr>
          <td>100원</td>
          <td class="charge-coin-count">0개</td>
        </tr>
        <tr>
          <td>50원</td>
          <td class="charge-coin-count">0개</td>
        </tr>
        <tr>
          <td>10원</td>
          <td class="charge-coin-count">0개</td>
        </tr>
      </table>
    </div>
  </section>`;

export { chargeTemplate };
