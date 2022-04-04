import Component from '../abstract/component';
import { API_URL } from '../constants';
import { customElement } from '../decorators/decortators';
import { UserInfo, Feedback, FieldSet } from '../types';
import {
  validateEmail,
  validateName,
  validatePassword,
  validateRePassword,
} from '../validation/validators';

type FeedbackRecord = {
  email: Feedback;
  name: Feedback;
  password: Feedback;
  repassword: Feedback;
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

  private feedbacks = { ...this.initialFeedbacks };

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
          placeholder: '이메일 주소를 입력해주세요',
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
    this.addEvent('click', 'button', this.onClickRegisterBtn);
  }

  setFeedbacks(feedbacks: FeedbackRecord) {
    this.feedbacks = { ...feedbacks };
    this.render();
  }

  onClickRegisterBtn = () => {
    const feedbacks = this.validate();
    this.setFeedbacks(feedbacks);
    const hasError = (Object.keys(feedbacks) as Array<keyof FeedbackRecord>).some(
      (key) => feedbacks[key].hasError
    );
    if (!hasError) {
      const [name, email, password] = [
        feedbacks.name.inputValue,
        feedbacks.email.inputValue,
        feedbacks.password.inputValue,
      ];
      this.register({ name, email, password });
    }
  };

  validate() {
    const feedbacks = { ...this.initialFeedbacks };
    const inputNames = ['email', 'name', 'password', 'repassword'];
    const inputs: Array<HTMLInputElement> = inputNames.map(
      (name) => this.querySelector(`input[name="${name}"]`) as HTMLInputElement
    );
    const [email, name, password, repassword] = inputs.map(($input) => $input.value.trim());

    feedbacks.email.inputValue = email;
    const { hasError: emailHasError, errorMessage: emailErrorMessage } = validateEmail(email);
    if (emailHasError)
      feedbacks.email = {
        ...feedbacks.email,
        hasError: emailHasError,
        errorMessage: emailErrorMessage,
      };

    feedbacks.name.inputValue = name;
    const { hasError: nameHasError, errorMessage: nameErrorMessage } = validateName(name);
    if (nameHasError)
      feedbacks.name = {
        ...feedbacks.name,
        hasError: nameHasError,
        errorMessage: nameErrorMessage,
      };

    feedbacks.password.inputValue = password;
    const { hasError: passwordHasError, errorMessage: passwordErrorMessage } =
      validatePassword(password);
    if (passwordHasError)
      feedbacks.password = {
        ...feedbacks.password,
        hasError: passwordHasError,
        errorMessage: passwordErrorMessage,
      };

    feedbacks.repassword.inputValue = repassword;
    const { hasError: repasswordHasError, errorMessage: repasswordErrorMessage } =
      validateRePassword(password, repassword);
    if (repasswordHasError)
      feedbacks.repassword = {
        ...feedbacks.repassword,
        hasError: repasswordHasError,
        errorMessage: repasswordErrorMessage,
      };

    return feedbacks;
  }

  register = ({ name, email, password }: UserInfo) => {
    fetch(`${API_URL}/register`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((body) => {
        const { errorMessage } = body;
        if (errorMessage) {
          alert(errorMessage);
          return;
        }
        alert('회원가입 완료!');
        location.href = `${location.origin}/login`;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  mount() {
    this.render();
  }

  render() {
    this.innerHTML = this.shouldRender() ? this.template(this.feedbacks) : '';
  }
}

export default RegisterPage;
