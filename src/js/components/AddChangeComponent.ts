const AddChangeComponent = () => {
  return `
  <div id="change-add-container">
      <p>자판기가 보유할 금액을 입력해주세요</p>
      <form id="change-add-form">
      <input
          type="number"
          id="change-add-input"
          placeholder="금액"
          required
      />
      <input type="submit" id="change-add-button" value="투입" />
      </form>
      <p>현재 보유 금액: <span id="total-change"></span>원</p>
  </div>`;
};

export default AddChangeComponent;
