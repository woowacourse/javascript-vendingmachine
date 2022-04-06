import Auth from '../domain/Auth';
import { historyRouterPush } from '../router';
import storage from '../storage';
import { $, $$, addEvent } from '../utils';
import { Path } from '../router';

class MainUI {
  constructor() {
    this.renderUI();
    // 셀렉트 박스 on/off
    $('.user-info-button').addEventListener('click', (e) => {
      $('.select-box').classList.toggle('hidden');
    });
    // selectbox 로그아웃
    $('.select-box__logout-button').addEventListener('click', (e) => {
      Auth.logout();
      $('.select-box-wrapper').classList.add('hidden');
      $('.login-button').classList.remove('hidden');
      historyRouterPush('/javascript-vendingmachine/logout');
    });
    // selecbox 회원정보 수정 버튼  history 추가
    $('.select-box__edit-profile-button').addEventListener('click', (e) => {
      $('.select-box-wrapper').classList.add('hidden');
      $('.header').classList.add('hidden');
      $('.nav').classList.add('hidden');
      historyRouterPush('/javascript-vendingmachine/editprofile');
    });

    // 메인 페이지 로그인 버튼 history 추가
    $('.login-button').addEventListener('click', (e) => {
      $('.login-button').classList.add('hidden');
      $('.header').classList.add('hidden');
      $('.nav').classList.add('hidden');
      historyRouterPush('/javascript-vendingmachine/signin');
    });

    // nav 버튼 history 추가
    $('.nav').addEventListener('click', (e) => {
      if ((e.target as HTMLButtonElement).type === undefined) return;

      const route = (e.target as HTMLButtonElement).getAttribute('route') as Path;
      historyRouterPush(route);
    });

    // 회원가입 버튼 클릭
    $('.signup-text').addEventListener('click', (e) => {
      historyRouterPush('/javascript-vendingmachine/signup');
    });
  }

  renderUI() {
    ($('#edit-profile-form__email') as HTMLInputElement).value = storage.getUserInfo().email;
    ($('#edit-profile-form__name') as HTMLInputElement).value = storage.getUserInfo().userName;
    const accessToken = storage.getAccessToken();
    if (accessToken) {
      $('.login-button').classList.add('hidden');
      $('.user-info-button').classList.remove('hidden');
      $('.user-info-button').textContent = storage.getUserInfo().userName.slice(0, 1);
      return;
    }
    $('.select-box').classList.add('hidden');
    $('.user-info-button').classList.add('hidden');
  }
}

export default MainUI;
