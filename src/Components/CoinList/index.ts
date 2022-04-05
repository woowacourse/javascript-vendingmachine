import { $, convertStringToElement, createTemplate } from 'Utils';
import { COIN_TYPE } from 'Constants';
import Component from 'Components/Abstract';
import HoldingAmountStore from 'Store/HoldingAmountStore';

import template from './template/index.html';
import templateTableRow from './template/tableRow.html';
import './styles.scss';

export default class CoinList extends Component {
  subscriberStore = [HoldingAmountStore];
  $table;

  constructor(props: ICoinListComponentProps) {
    super(props);

    this.renderMethodList = {
      coins: [this.drawHoldingAmountList],
    };
  }

  template() {
    return convertStringToElement(template);
  }

  setDom() {
    this.$table = $('#holding-amount-table', this.$component);
  }

  drawHoldingAmountList = ({ coins }) => {
    const $fragment = coins.reduce((previous, quantity, index) => {
      const $template = createTemplate(templateTableRow, {
        elementProperty: { dataset: { 'primary-key': index } },
        childTextContent: {
          '.type': `${COIN_TYPE[index]}원`,
          '.quantity': `${quantity}개`,
        },
      });

      previous.append($template);
      return previous;
    }, document.createDocumentFragment());

    $('tbody', this.$table).replaceChildren($fragment);
  };
}
