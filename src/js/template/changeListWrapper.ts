const changeListWrapper = () => {
  return `
  <div id="change-list-wrapper">
    <h4>자판기가 보유한 동전</h4>
    <ul id="change-list">
      <li class="list-header">
        <span class="change-block">동전</span>
        <span class="change-block">개수</span>
      </li>
      <li>
        <span class="change-block">500원</span>
        <span id="amount-coin-500" class="change-block"></span>
      </li>
      <li>
        <span class="change-block">100원</span>
        <span id="amount-coin-100" class="change-block"></span>
      </li>
      <li>
        <span class="change-block">50원</span>
        <span id="amount-coin-50" class="change-block"></span>
      </li>
      <li>
        <span class="change-block">10원</span>
        <span id="amount-coin-10" class="change-block"></span>
      </li>
    </ul>
  </div>`;
};

export default changeListWrapper;
