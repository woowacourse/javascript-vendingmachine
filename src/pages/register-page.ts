import RouteComponent from '../abstract/route-component';
import { API_URL } from '../constants';
import { customElement } from '../decorators/decortators';
import Router from '../router';
import { UserInfo, Feedback, FieldSet, WhiteList, ToastType } from '../types';
import { deepCopy, toast } from '../utils';
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
class RegisterPage extends RouteComponent {
  private _initialFeedbacks: FeedbackRecord = {
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

  private get initialFeedbacks(): FeedbackRecord {
    return deepCopy(this._initialFeedbacks) as FeedbackRecord;
  }

  private feedbacks?: FeedbackRecord;

  private isLoading = false;

  fieldsetTemplate({ label, name, placeholder, feedback, type, disabled }: FieldSet) {
    return `
      <fieldset class="mb-4">
        <label for="${name}">${label}</label>
        <input id="${name}" type="${type}" name="${name}" placeholder="${placeholder}" value="${
      feedback.inputValue
    }" class="form-control ${feedback.hasError ? 'has-error' : ''}" ${disabled ? 'disabled' : ''} />
        ${feedback.hasError ? `<div class="error-message">${feedback.errorMessage}</div>` : ''}
      </fieldset>
    `;
  }

  template(feedbacks: FeedbackRecord, isLoading: boolean): string {
    return `
      <header class="mb-12">
        <back-arrow data-path="${WhiteList.LoginPage}">Login</back-arrow>
        <h1>회원가입</h1>
      </header>
      <form>
        ${this.fieldsetTemplate({
          label: '이메일',
          name: 'email',
          placeholder: '이메일 주소를 입력해주세요',
          feedback: feedbacks.email,
          type: 'text',
          disabled: false,
        })}
        ${this.fieldsetTemplate({
          label: '이름',
          name: 'name',
          placeholder: '이름을 입력해 주세요',
          feedback: feedbacks.name,
          type: 'text',
          disabled: false,
        })}
        ${this.fieldsetTemplate({
          label: '비밀번호',
          name: 'password',
          placeholder: '비밀번호를 입력해 주세요',
          feedback: feedbacks.password,
          type: 'password',
          disabled: false,
        })}
        ${this.fieldsetTemplate({
          label: '비밀번호 확인',
          name: 'repassword',
          placeholder: '비밀번호를 입력해 주세요',
          feedback: feedbacks.repassword,
          type: 'password',
          disabled: false,
        })}
        <button type="button" class="btn btn-primary full btn-register ${
          isLoading ? 'loading' : ''
        }" ${isLoading ? 'disabled' : ''}>확인</button>
      </form>
    `;
  }

  setEvent() {
    this.addEvent<KeyboardEvent>('keyup', 'input', (e) => {
      if (e.key !== 'Enter') return;
      (this.querySelector('.btn-register') as HTMLButtonElement).click();
    });
    this.addEvent('click', '.btn-register', this.onClickRegisterBtn);
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
    this.render();
  }

  setFeedbacks(feedbacks: FeedbackRecord) {
    this.feedbacks = deepCopy(feedbacks) as FeedbackRecord;
    this.render();
  }

  onClickRegisterBtn = async () => {
    const feedbacks = this.validate();
    this.setFeedbacks(feedbacks);
    const hasError = (Object.keys(feedbacks) as Array<keyof FeedbackRecord>).some(
      (key) => feedbacks[key].hasError
    );
    if (hasError) {
      toast(ToastType.Error, '입력하신 정보를 다시 확인해 주세요');
      return;
    }

    this.setIsLoading(true);
    const [name, email, password] = [
      feedbacks.name.inputValue,
      feedbacks.email.inputValue,
      feedbacks.password.inputValue,
    ];

    try {
      const response = await this.register({ name, email, password });
      this.setIsLoading(false);
      if (!response) throw new Error('통신에 오류가 발생했습니다');

      const body = await response.json();

      if (!response.ok) {
        toast(ToastType.Error, body.errorMessage);
        return;
      }

      toast(ToastType.Success, '회원가입 완료!');
      Router.pushState(WhiteList.LoginPage);
    } catch (e) {
      console.error(e);
    }
  };

  validate() {
    const feedbacks = this.initialFeedbacks;
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

  async register({ name, email, password }: UserInfo) {
    return await fetch(`${API_URL}/register`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
  }

  onLocationChange() {
    this.feedbacks = this.initialFeedbacks;
    this.render();
  }

  mount() {
    this.render();
  }

  render() {
    if (!this.feedbacks) this.feedbacks = this.initialFeedbacks;
    this.innerHTML = this.shouldRender() ? this.template(this.feedbacks, this.isLoading) : '';
  }
}

export default RegisterPage;
