import Component from '../abstract/component';
import { customElement } from '../decorators/decortators';

@customElement('modify-member-form')
class ModifyMemberForm extends Component {
  template(): string {
    return `
    <h1 class="mb-12">회원 정보 수정</h1>
    <form onsubmit="return false">
      <div class="modify-member-form d-flex">
        <label for="email" class="mb-1">이메일</label>
        <input placeholder="woowacourse@gmail.com" name="email" class="input-email form-control mb-4" disabled/>
        <label for="name" class="mb-1">이름</label>
        <input placeholder="우테코" name="name" class="form-control mb-4" />
        <label for="password" class="mb-1">비밀번호</label>
        <input placeholder="비밀번호를 입력해주세요" name="password" class="form-control mb-4" />
        <label for="confirm-password" class="mb-1">비밀번호 확인</label>
        <input placeholder="비밀번호를 입력해주세요" name="confirm-password" class="form-control mb-8" />
        <button type="button" class="btn btn-primary mb-3">확인</button>
      </div>
    </form>
    `;
  }
}

export default ModifyMemberForm;
