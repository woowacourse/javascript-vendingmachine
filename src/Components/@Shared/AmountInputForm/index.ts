import { $, addEventDelegate, createTemplate } from 'Utils';
import Component from 'Components/Abstract';

import template from './template.html';
import './styles.scss';

export default class AmountInputForm extends Component<IAmountInputProps> {
  template() {
    const { totalAmountText, formLabel } = this.props;

    return createTemplate(template, {
      childTextContent: {
        label: formLabel,
        '#total-holding-amount-text': totalAmountText,
      },
    });
  }

  setEvents() {
    addEventDelegate(this.$component, '#amount-input-form', {
      eventType: 'submit',
      handler: this.handleAddMoney,
    });
  }

  handleAddMoney = event => {
    const $input = $('input[name="amount-input-form"]', event.target);
    const isAdded: boolean = this.props.onAddAmount(Number($input.value));

    if (!isAdded) return;
    $input.value = '';
  };
}
