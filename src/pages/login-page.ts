import RouteComponent from '../abstract/route-component';
import { ACCESS_TOKEN_KEY, API_URL, USER_INFO_KEY, WhiteList } from '../constants';
import { customElement } from '../decorators/decortators';
import Router from '../router';
import { FieldSet, Feedback, UserInfo, ToastType } from '../types';
import { deepCopy, toast } from '../utils';
import { validateLoginEmail, validateLoginPassword } from '../validation/validators';

type FeedbackRecord = {
  email: Feedback;
  password: Feedback;
};
@customElement('login-page')
class LoginPage extends RouteComponent {
  private _initialFeedbacks: FeedbackRecord = {
    email: {
      inputValue: '',
      hasError: false,
      errorMessage: '',
    },
    password: {
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
    }" class="form-control ${feedback.hasError ? 'has-error' : ''}" ${
      disabled ? 'disabled' : ''
    } data-test-id="${name}-input" />
        ${feedback.hasError ? `<div class="error-message">${feedback.errorMessage}</div>` : ''}
      </fieldset>
    `;
  }

  template(feedbacks: FeedbackRecord, isLoading: boolean): string {
    return `
      <back-arrow data-path="${WhiteList.Home}">Home</back-arrow>
      <header class="mb-12">
        <h1>로그인</h1>
      </header>
      <form>
        ${this.fieldsetTemplate({
          label: '이메일',
          name: 'email',
          placeholder: 'woowacourse@gmail.com',
          feedback: feedbacks.email,
          type: 'text',
          disabled: false,
        })}
        ${this.fieldsetTemplate({
          label: '비밀번호',
          name: 'password',
          placeholder: '비밀번호를 입력해주세요',
          feedback: feedbacks.password,
          type: 'password',
          disabled: false,
        })}
        <button type="button" class="btn btn-primary full btn-login ${
          isLoading ? 'loading' : ''
        }" ${isLoading ? 'disabled' : ''} data-test-id="login-btn">확인</button>
      </form>
      <div>
        <span>아직 회원이 아니신가요?</span><a>회원가입</a>
      </div>
    `;
  }

  setEvent() {
    this.addEvent<KeyboardEvent>('keyup', 'input', (e) => {
      if (e.key !== 'Enter') return;
      (this.querySelector('.btn-login') as HTMLButtonElement).click();
    });
    this.addEvent('click', '.btn-login', this.onClickLoginBtn);
    this.addEvent('click', 'a', (e: Event) => {
      e.preventDefault();
      Router.pushState(WhiteList.RegisterPage);
    });
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
    this.render();
  }

  setFeedbacks(feedbacks: FeedbackRecord) {
    this.feedbacks = deepCopy(feedbacks) as FeedbackRecord;
    this.render();
  }

  resetPasswordInput() {
    if (!this.feedbacks) return;
    this.feedbacks.password.inputValue = '';
    this.setFeedbacks(this.feedbacks);
  }

  onClickLoginBtn = async () => {
    const feedbacks = this.validate();
    this.setFeedbacks(feedbacks);
    const hasError = (Object.keys(feedbacks) as Array<keyof FeedbackRecord>).some(
      (key) => feedbacks[key].hasError
    );
    if (hasError) {
      toast(ToastType.Error, '이메일 혹은 비밀번호입력에 오류가 발생했습니다');
      this.resetPasswordInput();
      return;
    }
    this.setIsLoading(true);
    const [email, password] = [feedbacks.email.inputValue, feedbacks.password.inputValue];

    try {
      const response = await this.login({ email, password });
      this.setIsLoading(false);
      if (!response) throw new Error('통신에 오류가 발생했습니다');

      const body = await response.json();

      if (!response.ok) {
        toast(ToastType.Error, body.errorMessage);
        this.resetPasswordInput();
        return;
      }

      const { accessToken, user, message } = body;
      toast(ToastType.Success, message);
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      localStorage.setItem(USER_INFO_KEY, JSON.stringify(user));
      Router.pushState(WhiteList.Home);
    } catch (e) {
      console.error(e);
    }
  };

  async login({ email, password }: Omit<UserInfo, 'name'>) {
    return await fetch(`${API_URL}/login`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
  }

  validate() {
    const feedbacks = this.initialFeedbacks;
    const inputNames = ['email', 'password'];
    const inputs: Array<HTMLInputElement> = inputNames.map(
      (name) => this.querySelector(`input[name="${name}"]`) as HTMLInputElement
    );
    const [email, password] = inputs.map(($input) => $input.value.trim());

    feedbacks.email.inputValue = email;
    const { hasError: emailHasError, errorMessage: emailErrorMessage } = validateLoginEmail(email);
    if (emailHasError)
      feedbacks.email = {
        ...feedbacks.email,
        hasError: emailHasError,
        errorMessage: emailErrorMessage,
      };

    feedbacks.password.inputValue = password;
    const { hasError: passwordHasError, errorMessage: passwordErrorMessage } =
      validateLoginPassword(password);
    if (passwordHasError)
      feedbacks.password = {
        ...feedbacks.password,
        hasError: passwordHasError,
        errorMessage: passwordErrorMessage,
      };

    return feedbacks;
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

export default LoginPage;
