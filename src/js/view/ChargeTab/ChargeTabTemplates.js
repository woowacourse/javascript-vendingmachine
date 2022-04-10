import { MONEY_NAME_STRING } from '../../constants';

const chargeTabTemplate = /* html */ `
<section class="form-section" aria-labelledby="charge-tab-title">
  <h2 class="tab-title" id="charge-tab-title">잔돈 충전하기</h2>
  <form id="add-change-form">
    <details class="instruction-toggle">
      <summary class="instructions-title">💰 잔돈 충전 시 유의 사항</summary>
      <div class="instructions">
        <ul class="instructions-list">
          <li>최소 충전 금액: 10원</li>
          <li>최대 충전 가능 금액: 100,000원</li>
        </ul>
      </div>
    </details>
    <label for="change">자판기가 보유할 금액을 입력해주세요</label>
    <div class="input-form-wrapper">
      <input type="number" id="money-input" placeholder="금액" name="change" min="10" max="100000" step="10" required/>
      <button type="submit" class="submit-button">충전</button>
    </div>
  </form>
  <p>현재 보유 금액: <span id="total-change">0</span>원</p>
</section>
<table class="coin-status-table">
  <caption>
    자판기가 보유한 동전
  </caption>
  <tr>
    <th>동전</th>
    <th>개수</th>
  </tr>
  <tr>
    <td>500원</td>
    <td data-coin-name='${MONEY_NAME_STRING.COIN_500_WON}'>0개</td>
  </tr>
  <tr>
    <td>100원</td>
    <td data-coin-name='${MONEY_NAME_STRING.COIN_100_WON}'>0개</td>
  </tr>
  <tr>
    <td>50원</td>
    <td data-coin-name='${MONEY_NAME_STRING.COIN_50_WON}'>0개</td>
  </tr>
  <tr>
    <td>10원</td>
    <td data-coin-name='${MONEY_NAME_STRING.COIN_10_WON}'>0개</td>
  </tr>
</table>
`;

export default chargeTabTemplate;
