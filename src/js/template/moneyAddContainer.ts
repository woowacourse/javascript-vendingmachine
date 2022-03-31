import { Props } from '../interfaces/MoneyAdd.interface';

const moneyAddContainer = (props: Props) => {
  const { labelText, buttonText, resultText } = props;

  return `
  <div id="money-add-container">
      <p><label for="money-add-input">${labelText}</label></p>
      <form id="money-add-form">
      <input
          type="number"
          id="money-add-input"
          placeholder="금액"
          required
      />
      <input type="submit" value="${buttonText}" />
      </form>
      <p>${resultText}: <span id="total-money"></span>원</p>
  </div>`;
};

export default moneyAddContainer;
