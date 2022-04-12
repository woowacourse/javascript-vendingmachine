import { Coin } from '../interfaces/VendingMachine.interface';

const template = props => {
  const { title, showChangeReturnBtn } = props;

  return `
    <h4>${title}</h4>
    <ul id="change-list">
        <li class="list-header">
            <span class="change-block">동전</span>
            <span class="change-block">개수</span>
        </li>
        <li>
            <span class="change-block">500원</span>
            <span id="amount-coin-500" class="change-block">0개</span>
        </li>
        <li>
            <span class="change-block">100원</span>
            <span id="amount-coin-100" class="change-block">0개</span>
        </li>
        <li>
            <span class="change-block">50원</span>
            <span id="amount-coin-50" class="change-block">0개</span>
        </li>
        <li>
            <span class="change-block">10원</span>
            <span id="amount-coin-10" class="change-block">0개</span>
        </li>
    </ul>
    ${showChangeReturnBtn ? `<button type="button" id="change-return-button">반환</button>` : ''}`;
};

const ChangeListWrapper = () => {
  let $changeList: HTMLElement;
  let $amountCoin500: HTMLElement;
  let $amountCoin100: HTMLElement;
  let $amountCoin50: HTMLElement;
  let $amountCoin10: HTMLElement;

  const createElement = props => {
    const { targetElement, tabName } = props;
    const fragment = new DocumentFragment();
    const changeListWrapper = document.createElement('div');

    changeListWrapper.setAttribute('id', 'change-list-wrapper');
    changeListWrapper.insertAdjacentHTML(
      'beforeend',
      template({ ...props, showChangeReturnBtn: tabName === 'ProductPurchase' }),
    );
    fragment.appendChild(changeListWrapper);

    targetElement.appendChild(fragment);

    $changeList = targetElement.querySelector('#change-list');
    $amountCoin500 = $changeList.querySelector('#amount-coin-500');
    $amountCoin100 = $changeList.querySelector('#amount-coin-100');
    $amountCoin50 = $changeList.querySelector('#amount-coin-50');
    $amountCoin10 = $changeList.querySelector('#amount-coin-10');
  };

  const setState = (coins: Coin) => {
    const { coin10, coin50, coin100, coin500 } = coins;

    $amountCoin500.textContent = coin500 + '개';
    $amountCoin100.textContent = coin100 + '개';
    $amountCoin50.textContent = coin50 + '개';
    $amountCoin10.textContent = coin10 + '개';
  };

  return {
    createElement,
    setState,
  };
};

const changeListWrapper = ChangeListWrapper();

export default changeListWrapper;
