import Component from '../abstract/component';
import { customElement } from '../decorators/decortators';
import {
  validateEmail,
  validateName,
  validatePassword,
  validateRePassword,
} from '../validation/validators';

type Feedback = {
  inputValue: string;
  hasError: boolean;
  errorMessage: string;
};

type FeedbackRecord = {
  email: Feedback;
  name: Feedback;
  password: Feedback;
  repassword: Feedback;
};

type FieldSet = {
  label: string;
  name: string;
  placeholder: string;
  feedback: Feedback;
  type: 'text' | 'password';
};

@customElement('register-page')
class RegisterPage extends Component {
  private initialFeedbacks: FeedbackRecord = {
    email: {
      inputValue: '',
      hasError: false,
      errorMessage: '',
    },
    name: {
      inputValue: '',
      hasError: false,
      errorMessage: '',
    },
    password: {
      inputValue: '',
      hasError: false,
      errorMessage: '',
    },
    repassword: {
      inputValue: '',
      hasError: false,
      errorMessage: '',
    },
  };
  private feedbacks: FeedbackRecord = this.initialFeedbacks;

  connectedCallback() {
    super.connectedCallback();
    console.log('register connectedCallback is called');
    this.feedbacks = { ...this.initialFeedbacks };
  }

  fieldsetTemplate({ label, name, placeholder, feedback, type }: FieldSet) {
    return `
      <fieldset class="mb-4">
        <label for="${name}">${label}</label>
        <input id="${name}" type="${type}" name="${name}" placeholder="${placeholder}" value="${
      feedback.inputValue
    }" class="form-control ${feedback.hasError ? 'has-error' : ''}" />
        ${feedback.hasError ? `<div class="error-message">${feedback.errorMessage}</div>` : ''}
      </fieldset>
    `;
  }

  template(feedbacks: FeedbackRecord): string {
    return `
      <header class="mb-12">
        <h1>회원가입</h1>
      </header>
      <form>
        ${this.fieldsetTemplate({
          label: '이메일',
          name: 'email',
          placeholder: 'woowacourse@gmail.com',
          feedback: feedbacks.email,
          type: 'text',
        })}
        ${this.fieldsetTemplate({
          label: '이름',
          name: 'name',
          placeholder: '이름을 입력해 주세요',
          feedback: feedbacks.name,
          type: 'text',
        })}
        ${this.fieldsetTemplate({
          label: '비밀번호',
          name: 'password',
          placeholder: '비밀번호를 입력해 주세요',
          feedback: feedbacks.password,
          type: 'password',
        })}
        ${this.fieldsetTemplate({
          label: '비밀번호 확인',
          name: 'repassword',
          placeholder: '비밀번호를 입력해 주세요',
          feedback: feedbacks.repassword,
          type: 'password',
        })}
        <button type="button" class="btn btn-primary full">확인</button>
      </form>
    `;
  }

  setEvent() {
    this.addEvent('click', 'button', this.register);
  }

  register = () => {
    this.feedbacks = { ...this.initialFeedbacks };
    const inputNames = ['email', 'name', 'password', 'repassword'];
    const inputs: Array<HTMLInputElement> = inputNames.map(
      (name) => this.querySelector(`input[name="${name}"]`) as HTMLInputElement
    );
    const [email, name, password, repassword] = inputs.map(($input) => $input.value.trim());

    this.feedbacks.email.inputValue = email;
    const { hasError: emailHasError, errorMessage: emailErrorMessage } = validateEmail(email);
    if (emailHasError)
      this.feedbacks.email = {
        ...this.feedbacks.email,
        hasError: emailHasError,
        errorMessage: emailErrorMessage,
      };

    this.feedbacks.name.inputValue = name;
    const { hasError: nameHasError, errorMessage: nameErrorMessage } = validateName(name);
    if (nameHasError)
      this.feedbacks.name = {
        ...this.feedbacks.name,
        hasError: nameHasError,
        errorMessage: nameErrorMessage,
      };

    this.feedbacks.password.inputValue = password;
    const { hasError: passwordHasError, errorMessage: passwordErrorMessage } =
      validatePassword(password);
    if (passwordHasError)
      this.feedbacks.password = {
        ...this.feedbacks.password,
        hasError: passwordHasError,
        errorMessage: passwordErrorMessage,
      };

    this.feedbacks.repassword.inputValue = repassword;
    const { hasError: repasswordHasError, errorMessage: repasswordErrorMessage } =
      validateRePassword(password, repassword);
    if (repasswordHasError)
      this.feedbacks.repassword = {
        ...this.feedbacks.repassword,
        hasError: repasswordHasError,
        errorMessage: repasswordErrorMessage,
      };

    this.render();
  };

  mount() {
    this.render();
  }

  render() {
    this.innerHTML = this.shouldRender() ? this.template(this.feedbacks) : '';
  }
}

export default RegisterPage;
