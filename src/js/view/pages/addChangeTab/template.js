const addChangeTemplate = `
<section title="잔돈 충전">
  <form class="input-money-form" id="add-change-form">
    <label for="">자판기가 보유할 금액을 입력해주세요</label>
    <div>
      <input type="number" id="money-input" placeholder="금액" />
      <button type="submit" class="submit-button">충전</button>
    </div>
  </form>
  <p>현재 보유 금액: <span id="total-change">0</span>원</p>
</section>
<section class="table-section" title="자판기 현황">
  <table id="coin-status-table">
    <caption>
      자판기가 보유한 동전
    </caption>
    <tr>
      <th>동전</th>
      <th>개수</th>
    </tr>
    <tr>
      <td>500원</td>
      <td data-coin-name='FIVE_HUNDRED_WON'>0개</td>
    </tr>
    <tr>
      <td>100원</td>
      <td data-coin-name='ONE_HUNDRED_WON'>0개</td>
    </tr>
    <tr>
      <td>50원</td>
      <td data-coin-name='FIFTY_WON'>0개</td>
    </tr>
    <tr>
      <td>10원</td>
      <td data-coin-name='TEN_WON'>0개</td>
    </tr>
  </table>
</section>`;
export default addChangeTemplate;
