import { $ } from '../utils/dom';
import { EditProfile } from '../declarations/coreDeclaration';
import VerifyValueValidation from '../validations/verifyValueValidation';
import { getUserInfo } from '../utils/userInfoUtil';

class EditProfileTab implements EditProfile {
  verifyValue: VerifyValueValidation;
  constructor(verifyValue: VerifyValueValidation) {
    this.verifyValue = verifyValue;
    $('#edit-profile-confirm-button').addEventListener('click', this.handleEditProfile.bind(this));
  }

  handleEditProfile(e: Event): void {
    const userInfo = getUserInfo();
    if (!this.verifyValue.verifySignUpInfo(userInfo)) {
      return;
    }
    // 정보 로컬스토리지로
    // route 수정
    // index.js로
  }
}

export default EditProfileTab;
