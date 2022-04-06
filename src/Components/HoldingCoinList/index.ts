import { $, setContentOfChildElement } from 'Utils';
import Component from 'Components/Abstract';
import CoinList from 'Components/@Shared/CoinList';
import HoldingAmountStore from 'Store/HoldingAmountStore';

export default class HoldingCoinList extends Component {
  subscribeStore = [HoldingAmountStore];

  constructor(props: ICoinListComponentProps) {
    super(props);

    this.renderMethodList = {
      holdingCoins: [this.drawHoldingAmountList],
    };
  }

  template() {
    return this.createChildComponent(CoinList, {
      caption: '자판기가 보유한 동전',
    });
  }

  drawHoldingAmountList = ({ holdingCoins }: IStoreUniqueState) => {
    const updateQuantity = holdingCoins.reduce((previous, quantity, index) => {
      previous[`tr[data-primary-key='${index}'] .quantity`] = `${quantity}개`;
      return previous;
    }, {});

    setContentOfChildElement($('#coin-list-table tbody', this.$component), updateQuantity);
  };
}
