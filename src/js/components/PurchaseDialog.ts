const body = document.querySelector('body');

const template = props => {
  const {
    product: { name, price, amount },
    userMoney,
  } = props;
  return `
    <div class="dialog-contents">
        <div id="dialog-product-item">
            <p>상품명: ${name}</p>
            <p>가격: ${price}</p>
            <p>수량: ${amount}</p>
            <p>투입한 금액: ${userMoney}</p>
        </div>
        <form class="dialog-form">
            <div class="select-quantity-box">
                <label for="select-quantity">수량을 선택하세요</label>
                <button type="button" class="select-quantity-button select-quantity-down-button"><</button>
                <input type="number" id="select-quantity" value="1" readonly/>
                <button type="button" class="select-quantity-button select-quantity-up-button">></button>
            </div>
            <button type="submit" class="dialog-purchase-button">구매하기</button>
        </form>
    <div>
  `;
};

const PurchaseDialog = props => {
  const {
    product: { name, price, amount },
    callbackSubmitQuantity,
    li,
    userMoney,
  } = props;

  const maxPurchaseAmount = (() => {
    const userAmount = Math.floor(userMoney / price);
    return amount >= userAmount ? userAmount : amount;
  })();
  const fragment = new DocumentFragment();
  const div = document.createElement('div');

  div.classList.add('dialog');
  div.insertAdjacentHTML('beforeend', template(props));
  fragment.appendChild(div);
  body.appendChild(fragment);

  const dialogForm = div.querySelector('.dialog-form');
  const selectQuantity = <HTMLInputElement>div.querySelector('#select-quantity');
  const downButton = div.querySelector('.select-quantity-down-button');
  const upButton = div.querySelector('.select-quantity-up-button');

  const onCloseDialog = (e: PointerEvent) => {
    if (!(e.target instanceof HTMLElement) || e.target.className !== 'dialog') return;

    div.remove();
  };

  const onSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    const quantity = selectQuantity.valueAsNumber;
    const newAmount = amount - quantity;
    const product = { name, price, amount: newAmount };

    callbackSubmitQuantity({ quantity, product, li });
    div.remove();
  };

  const onDownQuantity = () => {
    const nextValue = selectQuantity.valueAsNumber - 1;
    if (nextValue > 0) selectQuantity.valueAsNumber = nextValue;
  };

  const onUpQuantity = () => {
    const nextValue = selectQuantity.valueAsNumber + 1;
    if (nextValue > amount || nextValue > maxPurchaseAmount) return;

    selectQuantity.valueAsNumber = selectQuantity.valueAsNumber + 1;
  };

  div.addEventListener('click', onCloseDialog);
  dialogForm.addEventListener('submit', onSubmit);
  downButton.addEventListener('click', onDownQuantity);
  upButton.addEventListener('click', onUpQuantity);
};

export default PurchaseDialog;
