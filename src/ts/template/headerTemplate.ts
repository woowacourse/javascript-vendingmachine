import HASH from '../constant/hash';
import { CLASS } from '../constant/selector';
import { Hash } from '../types';

export const generateTabHeaderTemplate = (hash: Hash): string => `
  <div id="authentication-container">
    <button class="login-button default-button ">로그인</button>
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

export const generateLoginHeaderTemplate = (): string =>
  `<h1 class="authentication-header-title">로그인</h1>`;
