const changeListWrapper = () => {
  return `
  <div id="change-list-wrapper">
    <h4>자판기가 보유한 동전</h4>
    <ul id="change-list">
      <li class="list-header">
        <span>동전</span>
        <span>개수</span>
      </li>
      <li>
        <span>500원</span>
        <span id="amount-coin-500"></span>
      </li>
      <li>
        <span>100원</span>
        <span id="amount-coin-100"></span>
      </li>
      <li>
        <span>50원</span>
        <span id="amount-coin-50"></span>
      </li>
      <li>
        <span>10원</span>
        <span id="amount-coin-10"></span>
      </li>
    </ul>
  </div>`;
};

export default changeListWrapper;
