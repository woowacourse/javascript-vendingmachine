import { $, createTemplate } from 'Utils';
import { COIN_TYPE } from 'Constants';
import Component from 'Components/Abstract';

import template from './template/index.html';
import templateTableRow from './template/tableRow.html';
import './styles.scss';

export default class CoinList extends Component {
  template() {
    const { caption } = this.props;

    const $coinRows = COIN_TYPE.reduce((previous, amount, index) => {
      const $tableRow = createTemplate(templateTableRow, {
        elementProperty: { dataset: { 'primary-key': index } },
        childTextContent: {
          '.type': `${amount}원`,
          '.quantity': '0개',
        },
      });

      previous.append($tableRow);
      return previous;
    }, document.createDocumentFragment());

    const $coinListTable = createTemplate(template, {
      childTextContent: {
        caption,
      },
    });

    $('tbody', $coinListTable).replaceChildren($coinRows);

    return $coinListTable;
  }
}
