import Component from '../abstract/component';
import { customElement } from '../decorators/decortators';

@customElement('login-page')
class LoginPage extends Component {
  template(): string {
    return `
      <header class="mb-12">
        <h1>로그인</h1>
      </header>
      <form>
        <fieldset class="mb-4">
          <label id="email">이메일</label>
          <input name="email" placeholder="woowacourse@gmail.com" class="form-control" />
        </fieldset>
        <fieldset>
          <label id="password">비밀번호</label>
          <input name="password" placeholder="비밀번호를 입력해주세요" class="form-control" />
        </fieldset>
        <button class="btn btn-primary full">확인</button>
      </form>
      <div>
        <span>아직 회원이 아니신가요?</span><a href="/register">회원가입</a>
      </div>
    `;
  }

  mount() {
    this.render();
  }

  render() {
    this.innerHTML = this.shouldRender() ? this.template() : '';
  }
}

export default LoginPage;
