import Component from '../abstract/component';
import { customElement } from '../decorators/decortators';
import { getUserInfo, updateInfo } from '../member';
import { EventOnElement } from '../types';
import { showSnack } from '../utils';
import { validateSignUp } from '../validation/validators';

@customElement('modify-member-form')
class ModifyMemberForm extends Component {
  template(email: string, name: string): string {
    return `
    <h1 class="mb-12">회원 정보 수정</h1>
    <form onsubmit="return false">
      <div class="modify-member-form d-flex">
        <label for="email" class="mb-1">이메일</label>
        <input id="modify-email-input" type="email" placeholder="${email}" name="email" class="input-email form-control mb-4" disabled/>
        <label for="name" class="mb-1">이름</label>
        <input id="modify-name-input" type="name" placeholder="${name}" name="name" class="form-control mb-4" />
        <label for="password" class="mb-1">비밀번호</label>
        <input id="modify-password-input" type="password" placeholder="비밀번호를 입력해주세요" name="password" class="form-control mb-4" />
        <label for="confirm-password" class="mb-1">비밀번호 확인</label>
        <input id="modify-confirm-password-input" type="password" placeholder="비밀번호를 입력해주세요" name="confirm-password" class="form-control mb-8" />
        <button type="button" class="btn btn-primary mb-3">확인</button>
      </div>
    </form>
    `;
  }

  setEvent() {
    this.addEvent('click', 'button', this.onClickModifyBtn);
    this.addEvent('keyup', 'input', this.onPressEnter);
  }

  onClickModifyBtn = async () => {
    const $name = this.querySelector('#modify-name-input') as HTMLInputElement;
    const $password = this.querySelector('#modify-password-input') as HTMLInputElement;
    const $confirmPassword = this.querySelector(
      '#modify-confirm-password-input'
    ) as HTMLInputElement;

    const [name, password, confirmPassword] = [
      $name.value,
      $password.value,
      $confirmPassword.value,
    ];

    const { hasError, errorMessage } = validateSignUp(name, password, confirmPassword);

    if (hasError) {
      showSnack(errorMessage);
      return;
    }

    await updateInfo(name, password);
  };

  onPressEnter = ({ key }: EventOnElement) => {
    if (key === 'Enter') this.onClickModifyBtn();
  };

  mount() {
    this.render();
  }

  async render() {
    const { email, name } = await getUserInfo();
    this.innerHTML = this.template(email, name);
  }
}

export default ModifyMemberForm;
