const chargeTemplate = () => {
  return `
  <div>
    <form class="charge-manange__form">
      <label>자판기가 보유할 금액을 입력해주세요.</label>
        <div>
          <input type="number" placeholder="금액" value="" class="charge-manange__input" />
          <button type="submit" class="charge-manange__add-button">충전</button>
        </div>
    </form>  
  </div>
  <div>
    <p>현재 보유 금액: <span class="charge-manange__holding-amount"></span>원</p>
  </div>
  <div>
    <h1 class="charge-manange__title">자판기가 보유한 동전</h1>
    <table class="charge-manange__table">
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
  </div>`;
};

export { chargeTemplate };
