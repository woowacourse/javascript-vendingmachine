import { URL } from '../constants/appContants';

export const userMenuTemplate = `
  <section id="user-menu">
    <ul>
      <li id="menu-edit-profile" data-url=${URL.EDIT_PROFILE}>회원 정보 수정</li>
      <li id="menu-sign-out">로그아웃</li>
    </ul>
  </section>
`;
