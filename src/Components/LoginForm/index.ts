import Component from 'Components/Abstract';
import UserSessionStore from 'Store/UserSessionStore';
import ValidationInput from 'Components/@Shared/ValidationInput';
import {
  $,
  addEventDelegate,
  convertStringToElement,
  isPassEmailRules,
  routingEvent,
  validateUserLogin,
  snackbar,
} from 'Utils';

import template from './template.html';

export default class LoginForm extends Component {
  subscribeStore = [UserSessionStore];

  $emailInput: HTMLInputElement;
  $passwordInput: HTMLInputElement;

  constructor(props) {
    super(props);

    this.renderMethodList = {
      userSessionEvent: [this.handleUserSessionListener],
    };
  }

  template() {
    const $fragment = document.createDocumentFragment();

    $fragment.append(
      this.createChildComponent<IValidationInputProps>(ValidationInput, {
        name: 'email',
        type: 'email',
        label: '이메일',
        placeholder: 'compy@compy.life',
        isValidationCheck: isPassEmailRules,
        errorMessage: '이메일 주소를 정확하게 입력해주세요.',
      }),
    );

    $fragment.append(
      this.createChildComponent<IValidationInputProps>(ValidationInput, {
        name: 'password',
        type: 'password',
        label: '비밀번호',
        placeholder: '비밀번호를 입력해주세요.',
      }),
    );

    const $template = convertStringToElement(template);
    $('#login-form', $template).prepend($fragment);

    this.$emailInput = $('input[name="email"]', $template);
    this.$passwordInput = $('input[name="password"]', $template);

    return $template;
  }

  setEvents() {
    addEventDelegate(this.$component, '#login-form', {
      eventType: 'submit',
      handler: this.handleTryLogin,
    });
  }

  handleTryLogin = () => {
    const inputEmail = this.$emailInput.value;
    const inputPassword = this.$passwordInput.value;

    try {
      validateUserLogin(inputEmail, inputPassword);
    } catch (error) {
      snackbar(error.message, 'warning');
      return;
    }

    UserSessionStore.login(this.$emailInput.value, this.$passwordInput.value);
  };

  handleUserSessionListener = ({ userSessionEvent }: IStoreState) => {
    const { isDone, isError, message } = userSessionEvent;

    if (isDone === false && isError === true) {
      snackbar(message, 'warning');
      UserSessionStore.initSessionEvent();
    }

    if (isDone === true && isError === false) {
      routingEvent('purchase');
      UserSessionStore.initSessionEvent();
    }
  };
}
