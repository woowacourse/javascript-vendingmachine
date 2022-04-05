import { $ } from '../utils/dom';
import { EditProfile } from '../declarations/coreDeclaration';

class EditProfileTab implements EditProfile {
  constructor() {
    $('#edit-profile-confirm-button').addEventListener('click', this.handleEditProfile);
  }

  handleEditProfile(e: Event): void {
    e.preventDefault();
    console.log('EditProfile');
    // 값 검증 -> 성공할 시,
    // 정보 로컬스토리지로
    // route 수정
    // index.js로
  }
}

export default EditProfileTab;
