import { $, addEventDelegate, convertStringToElement, setContentOfChildElement } from 'Utils';
import Component from 'Components/Abstract';
import CoinList from 'Components/@Shared/CoinList';
import HoldingAmountStore from 'Store/HoldingAmountStore';

import templateReturnButton from './template.html';
import './styles.scss';

export default class ReturnCoinList extends Component {
  subscribeStore = [HoldingAmountStore];
  $returnCoinButton: HTMLElement;

  constructor(props: ICoinListComponentProps) {
    super(props);

    this.renderMethodList = {
      chargedAmount: [this.drawReturnCoinButton],
      returnCoins: [this.drawHoldingAmountList],
    };
  }

  template() {
    const $template = this.createChildComponent(CoinList, {
      caption: '잔돈 반환',
    });

    this.$returnCoinButton = convertStringToElement(templateReturnButton);
    if ($template instanceof HTMLElement) $template.append(this.$returnCoinButton);

    return $template;
  }

  setEvents() {
    addEventDelegate(this.$component, '#return-change-button', {
      eventType: 'click',
      handler: this.onReturnChargedAmount,
    });
  }

  onReturnChargedAmount() {
    HoldingAmountStore.returnCoins();
  }

  drawReturnCoinButton = ({ chargedAmount }) => {
    this.$returnCoinButton.classList.toggle('hide', chargedAmount === 0);
  };

  drawHoldingAmountList = ({ returnCoins }: IStoreState) => {
    const updateQuantity = returnCoins.reduce((previous, quantity, index) => {
      previous[`tr[data-primary-key='${index}'] .quantity`] = `${quantity}개`;
      return previous;
    }, {});

    setContentOfChildElement($('#coin-list-table tbody', this.$component), updateQuantity);
  };
}
