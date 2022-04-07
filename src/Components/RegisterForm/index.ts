import Component from 'Components/Abstract';
import ValidationInput from 'Components/@Shared/ValidationInput';
import UserSessionStore from 'Store/UserSessionStore';
import {
  $,
  addEventDelegate,
  createTemplate,
  isPassEmailRules,
  isPassPasswordRules,
  isUserNameRules,
  routingEvent,
  Snackbar,
  validateUserRegister,
} from 'Utils';
import { DEFAULT_PAGE } from 'Constants';

import template from './template.html';

export default class RegisterForm extends Component {
  subscribeStore = [UserSessionStore];

  $emailInput: HTMLInputElement;
  $nameInput: HTMLInputElement;
  $passwordInput: HTMLInputElement;
  $passwordConfirmInput: HTMLInputElement;

  constructor(props) {
    super(props);

    this.renderMethodList = {
      userSessionEvent: [this.onUserSessionEventListener],
    };
  }

  template() {
    const $fragment = document.createDocumentFragment();

    $fragment.append(
      this.createChildComponent<IValidationInputProps>(ValidationInput, {
        name: 'email',
        type: 'email',
        label: '이메일',
        placeholder: '이메일 주소를 입력해주세요.',
        isValidationCheck: isPassEmailRules,
        errorMessage: '이메일 주소를 정확히 입력해주세요.',
      }),
    );

    $fragment.append(
      this.createChildComponent<IValidationInputProps>(ValidationInput, {
        name: 'name',
        type: 'text',
        label: '이름',
        placeholder: '이름을 입력해주세요.',
        isValidationCheck: isUserNameRules,
        errorMessage: '이름은 최소 1자에서 6자까지 입력하여야합니다.',
      }),
    );

    $fragment.append(
      this.createChildComponent<IValidationInputProps>(ValidationInput, {
        name: 'password',
        type: 'password',
        label: '비밀번호',
        placeholder: '비밀번호를 입력해주세요.',
        isValidationCheck: isPassPasswordRules,
        errorMessage: '영문과 숫자를 포함하여 최소 6자 이상 입력하여야합니다.',
      }),
    );

    $fragment.append(
      this.createChildComponent<IValidationInputProps>(ValidationInput, {
        name: 'confirm-password',
        type: 'password',
        label: '비밀번호 확인',
        placeholder: '비밀번호를 입력해주세요.',
        isValidationCheck: (confirmPassword: string): boolean => {
          const $password = $('input[name="password"]', this.$component);
          return $password && confirmPassword === $password.value;
        },
        errorMessage: '비밀먼호를 다시 확인해주세요.',
      }),
    );

    const $template = createTemplate(template, {
      childTextContent: {},
    });

    $('#register-form', $template).prepend($fragment);

    this.$emailInput = $('input[name="email"]', $template);
    this.$nameInput = $('input[name="name"]', $template);
    this.$passwordInput = $('input[name="password"]', $template);
    this.$passwordConfirmInput = $('input[name="confirm-password"]', $template);

    return $template;
  }

  setEvents() {
    addEventDelegate(this.$component, '#register-form', {
      eventType: 'submit',
      handler: this.onRegisterSubmit,
    });
  }

  onRegisterSubmit = () => {
    const [inputEmail, inputName, inputPassword, inputPasswordConfirm] = [
      this.$emailInput.value,
      this.$nameInput.value,
      this.$passwordInput.value,
      this.$passwordConfirmInput.value,
    ];

    try {
      validateUserRegister(inputEmail, inputName, inputPassword, inputPasswordConfirm);
    } catch (error) {
      Snackbar(error.message, 'warning');
      return;
    }

    UserSessionStore.register(inputEmail, inputName, inputPassword);
  };

  onUserSessionEventListener = ({ userSessionEvent }: IStoreUniqueState) => {
    const { isDone, isError, message } = userSessionEvent;

    if (isDone === false && isError === true) {
      Snackbar(message, 'warning');
      UserSessionStore.initSessionEvent();
    }

    if (isDone === true && isError === false) {
      routingEvent(DEFAULT_PAGE);
      UserSessionStore.initSessionEvent();
    }
  };
}
