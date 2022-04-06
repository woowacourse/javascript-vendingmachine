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
    addEventDelegate(this.$component, '#add-holding-amount-form', {
      eventType: 'submit',
      handler: this.onSubmit,
    });
  }

  onSubmit = event => {
    const $input = $('input[name="add-holding-amount"]', event.target);
    const isAdded = this.props.onAddAmount(Number($input.value));

    if (!isAdded) return;
    $input.value = '';
  };
}
