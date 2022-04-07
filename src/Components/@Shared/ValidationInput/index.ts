import Component from 'Components/Abstract';
import { $, addEventDelegate, createTemplate, setElementProperty } from 'Utils';

import template from './template.html';
import './styles.scss';

export default class ValidationInput extends Component<IValidationInputProps> {
  $input: HTMLInputElement;

  template() {
    const { name, type, label, placeholder } = this.props;
    const { isDisabled = false, value = '', errorMessage = '' } = this.props;

    const $template = createTemplate(template, {
      childTextContent: {
        label,
        '.error-message': errorMessage,
      },
    });

    this.$input = $('input', $template);
    setElementProperty(this.$input, {
      disabled: isDisabled,
      type,
      name,
      placeholder,
      value,
    });

    $('label', $template).setAttribute('for', name);
    return $template;
  }

  setEvents() {
    addEventDelegate(this.$component, 'input', {
      eventType: 'change',
      handler: this.onChangeValue,
    });
  }

  onChangeValue = ({ target: $target }) => {
    const { isValidationCheck } = this.props;
    if (typeof isValidationCheck !== 'function') return;

    if (this.$component instanceof DocumentFragment) return;
    this.$component.classList.toggle('error', !isValidationCheck($target.value));
  };
}
