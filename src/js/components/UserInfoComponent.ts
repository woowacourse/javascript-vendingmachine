import requestModifyUserData from '../api/requestModifyUserData';
import { User } from '../interfaces/UserData.interface';
import throwableFunctionHandler from '../utils/throwableFunctionHandler';
import { getUserData } from '../utils/userAction';
import { checkUserDataValidate } from '../utils/userValidation';

class UserInfoComponent {
  parentElement: HTMLElement;
  noticeStateChanged: Function;
  $loginInputSection: HTMLElement;
  $userInfoForm: HTMLElement;
  $mainContents: HTMLElement;
  user: User;

  constructor(parentElement: HTMLElement, noticeStateChanged: Function) {
    this.parentElement = parentElement;
    this.noticeStateChanged = noticeStateChanged;
    this.user = getUserData();
  }

  private bindEventAndElement = () => {
    this.$loginInputSection = this.parentElement.querySelector('#login-input-container');
    this.$userInfoForm = document.querySelector('#user-info-form');
    this.$mainContents = document.querySelector('.main-contents');

    this.$userInfoForm.addEventListener('submit', this.onSubmitUserData);
  };

  private onSubmitUserData = async (e: SubmitEvent) => {
    e.preventDefault();

    const userData = {
      email: this.user.email,
      name: (<HTMLInputElement>this.$userInfoForm.querySelector('#name-input')).value,
      password: (<HTMLInputElement>this.$userInfoForm.querySelector('#password-input')).value,
      passwordCheck: (<HTMLInputElement>this.$userInfoForm.querySelector('#password-check-input')).value,
      id: this.user.id,
    };

    if (await throwableFunctionHandler(() => this.checkValidateAndRequest(userData))) {
      this.noticeStateChanged();
    }
  };

  private checkValidateAndRequest = (userData: User) => {
    return checkUserDataValidate(userData) && requestModifyUserData(userData);
  };

  render = () => {
    this.parentElement.insertAdjacentHTML('beforeend', this.template());
    this.bindEventAndElement();
    this.$mainContents.replaceChildren();
  };

  template = () => `<h1>회원 정보 수정</h1>
    <form id="user-info-form" class="multiple-input-form">
      <label for="email-input">이메일</label>
      <input type="email" id="email-input" value="${this.user.email}" disabled />
      <label for="name-input">이름</label>
      <input type="text" id="name-input" value="${this.user.name}" placeholder="이름을 입력해주세요" required />
      <label for="password-input">비밀번호</label>
      <input type="password" id="password-input" placeholder="비밀번호를 입력해주세요" required />
      <label for="password-check-input">비밀번호 확인</label>
      <input type="password" id="password-check-input" placeholder="비밀번호를 입력해주세요" required />
      <input type="submit" id="modify-button" class="submit-button" value="확인" />
    </form>`;
}

export default UserInfoComponent;
