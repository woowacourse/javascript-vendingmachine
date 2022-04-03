import Component from '../abstract/component';
import { customElement } from '../decorators/decortators';
import { signUp } from '../member';
import { showSnack } from '../utils';

@customElement('sign-up-form')
class SignUpFrom extends Component {
  template(): string {
    return `
    <h1 class="mb-12">회원가입</h1>
    <form onsubmit="return false">
      <div class="signup-form d-flex">
        <label type="email" for="email" class="mb-1">이메일</label>
        <input placeholder="이메일 주소를 입력해주세요" name="email" class="form-control mb-4" />
        <label type="name" for="name" class="mb-1">이름</label>
        <input placeholder="이름을 입력해주세요" name="name" class="form-control mb-4" />
        <label for="password" class="mb-1">비밀번호</label>
        <input type="password" placeholder="비밀번호를 입력해 주세요" name="password" class="form-control mb-4" />
        <label for="confirm-password" class="mb-1">비밀번호 확인</label>
        <input type="password" placeholder="비밀번호를 입력해 주세요" name="confirm-password" class="form-control mb-8" />
        <button type="button" class="btn btn-primary mb-3">확인</button>
      </div>
    </form>
    `;
  }

  setEvent() {
    this.addEvent('click', 'button', this.onClickSignUpBtn);
  }

  onClickSignUpBtn = () => {
    const [$email, $name, $password, $confirmPassword] = this.querySelectorAll('input');
    const [email, name, password, confirmPassword] = [
      $email.value,
      $name.value,
      $password.value,
      $confirmPassword.value,
    ];

    if (password !== confirmPassword) {
      showSnack('비밀번호를 다시 확인해주세요.');
      return;
    }
    signUp(email, name, password);
  };
}

export default SignUpFrom;
