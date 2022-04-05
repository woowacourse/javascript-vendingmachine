import { $, createTemplate } from 'Utils';
import Component from 'Components/Abstract';

import template from './template.html';
import './styles.scss';

export default class AmountInputForm extends Component<IAmountInputProps> {
  $addForm;

  template() {
    const { totalAmountText } = this.props;

    return createTemplate(template, {
      childTextContent: {
        '#total-holding-amount-text': totalAmountText,
      },
    });
  }

  setDom() {
    this.$addForm = $('#add-holding-amount-form', this.$component);
  }

  setEvents() {
    const { onSubmit } = this.props;
    this.$addForm.addEventListener('submit', onSubmit);
  }
}
