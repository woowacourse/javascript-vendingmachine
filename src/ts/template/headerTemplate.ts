import HASH from '../constant/hash';
import { CLASS } from '../constant/selector';
import { Hash } from '../types';

export const generateUnauthorizedTabHeaderTemplate = (): string => `
  <div class="login-button-wrapper">
    <button class="login-button default-button">로그인</button>
  </div>
  <h1>🍿 자판기 🍿</h1>
`;

export const generateAuthorizedTebHeaderTemplate = (hash: Hash, userName: string): string => `
  <div class="authentication-container">
      <div class="thumbnail-wrapper">
        <button class="thumbnail-button">${userName.charAt(0)}</button>
        <div class="side-button-wrapper hide">
          <button id="edit-button" class="default-button side-button">회원 정보 수정</button>
          <button id="logout-button" class="default-button side-button">로그아웃</button>
        </div>
      </div>
  </div>
  <h1>🍿 자판기 🍿</h1>
  <nav id="tab-button-container">
    <button id="item-manage-tab-button" class="nav-tab-button ${
      hash === HASH.ITEM_MANAGE ? CLASS.SELECTED : ''
    }" type="button" data-hash="#item-manage">상품 관리</button>
    <button id="coin-recharge-tab-button" class="nav-tab-button ${
      hash === HASH.COIN_RECHARGE ? CLASS.SELECTED : ''
    }" type="button" data-hash="#coin-recharge">잔돈 충전</button>
    <button id="item-purchase-tab-button" class="nav-tab-button ${
      hash === HASH.ITEM_PURCHASE || hash === '' ? CLASS.SELECTED : ''
    }" type="button" data-hash="#item-purchase">상품 구매</button>
  </nav>
`;

export const generateAuthenticationHeaderTemplate = (headerTitle: string): string =>
  `<h1 class="authentication-header-title">${headerTitle}</h1>`;
