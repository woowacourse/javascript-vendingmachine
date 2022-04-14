import RouteComponent from '../abstract/route-component';
import { ACCESS_TOKEN_KEY, API_URL, USER_INFO_KEY, WhiteList } from '../constants';
import { customElement } from '../decorators/decortators';
import Router from '../router';
import { FieldSet, Feedback, UserInfo, ToastType } from '../types';
import { deepCopy, getUserInfoFromLocalStorage, toast } from '../utils';
import { validateName, validatePassword, validateRePassword } from '../validation/validators';

type FeedbackRecord = {
  email: Feedback;
  name: Feedback;
  password: Feedback;
  repassword: Feedback;
};

@customElement('my-account-page')
class MyAccountPage extends RouteComponent {
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
    const userInfo = getUserInfoFromLocalStorage();
    if (userInfo) {
      this._initialFeedbacks.email.placeholder = userInfo.email;
      this._initialFeedbacks.name.placeholder = userInfo.name;
    }
    return deepCopy(this._initialFeedbacks) as FeedbackRecord;
  }

  private feedbacks?: FeedbackRecord;

  private isLoading = false;

  fieldsetTemplate({ label, name, placeholder, feedback, type, disabled }: FieldSet) {
    return `
      <fieldset class="mb-4">
        <label for="${name}">${label}</label>
        <input id="${name}" type="${type}" name="${name}" placeholder="${
      feedback.placeholder ?? placeholder
    }" value="${feedback.inputValue}" class="form-control ${
      feedback.hasError ? 'has-error' : ''
    }" ${disabled ? 'disabled' : ''} />
        ${feedback.hasError ? `<div class="error-message">${feedback.errorMessage}</div>` : ''}
      </fieldset>
    `;
  }

  template(feedbacks: FeedbackRecord, isLoading: boolean): string {
    return `
      <back-arrow data-path="${WhiteList.Home}">Home</back-arrow>
      <header class="mb-12">
        <h1>회원 정보 수정</h1>
      </header>
      <form>
        ${this.fieldsetTemplate({
          label: '이메일',
          name: 'email',
          placeholder: '',
          feedback: feedbacks.email,
          type: 'text',
          disabled: true,
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
        <button type="button" class="btn btn-primary full btn-edit-user-info ${
          isLoading ? 'loading' : ''
        }" ${isLoading ? 'disabled' : ''}>확인</button>
      </form>
    `;
  }

  setEvent() {
    this.addEvent<KeyboardEvent>('keyup', 'input', (e) => {
      if (e.key !== 'Enter') return;
      (this.querySelector('.btn-edit-user-info') as HTMLButtonElement).click();
    });
    this.addEvent('click', '.btn-edit-user-info', this.onClickEditBtn);
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
    this.render();
  }

  setFeedbacks(feedbacks: FeedbackRecord) {
    this.feedbacks = deepCopy(feedbacks) as FeedbackRecord;
    this.render();
  }

  onClickEditBtn = async () => {
    const feedbacks = this.validate();
    this.setFeedbacks(feedbacks); // feedback먼저 보여준다
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
      this._initialFeedbacks.email.placeholder!,
      feedbacks.password.inputValue,
    ];
    try {
      const response = await this.edit({ name, email, password });
      this.setIsLoading(false);
      if (!response) throw new Error('통신에 오류가 발생했습니다');

      const body = await response.json();

      if (!response.ok) {
        toast(ToastType.Error, body.errorMessage);
        return;
      }

      const { user, message } = body;
      toast(ToastType.Success, message);
      localStorage.setItem(USER_INFO_KEY, JSON.stringify(user));
      const feedbacks = this.initialFeedbacks;
      this.setFeedbacks(feedbacks);
    } catch (e) {
      console.log(e);
    }
  };

  async edit({ name, email, password }: UserInfo) {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!accessToken) {
      toast(ToastType.Error, '계정정보가 없습니다. 다시 로그인 해주세요');
      location.href = `${location.origin}/login`;
      return;
    }
    return await fetch(`${API_URL}/edit`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
  }

  validate() {
    const feedbacks = this.initialFeedbacks;
    const inputNames = ['name', 'password', 'repassword'];
    const inputs: Array<HTMLInputElement> = inputNames.map(
      (name) => this.querySelector(`input[name="${name}"]`) as HTMLInputElement
    );
    const [name, password, repassword] = inputs.map(($input) => $input.value.trim());

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

  onLocationChange() {
    this.feedbacks = undefined; // 이렇게 해야 render할때 email, name에 placeholder가 제대로 들어간다
    this.render();
  }

  mount() {
    this.render();
  }

  render() {
    if (!this.shouldRender()) {
      this.innerHTML = '';
      return;
    }

    const userInfo = getUserInfoFromLocalStorage();
    if (!userInfo) {
      toast(ToastType.Error, '계정정보가 없습니다. 다시 로그인 해주세요');
      Router.pushState(WhiteList.LoginPage);
      return;
    }
    if (!this.feedbacks) this.feedbacks = this.initialFeedbacks;
    this.innerHTML = this.template(this.feedbacks, this.isLoading);
  }
}

export default MyAccountPage;
