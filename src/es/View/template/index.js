import { COIN_TYPE } from '../../constants';
import User from '../../data/User';

const template = {
  userAreaContentForMember: (name) => `
    <button type="button" id="user-thumbnail-button" name="thumbnail-button" class="thumbnail-button">${name[0]}</button>
    <ul id="member-menu" class="hidden">
      <li data-page="updateMyInfo">회원 정보 수정</li>
      <li id="logout-button">로그아웃</li>
    </ul>
  `,

  userAreaContentForNonMember: '<button id="login-button" class="button" data-page="login">로그인</button>',

  productTableRowInners: ({ name, price, quantity }) => `
    <td>${name}</td>
    <td>${price.toLocaleString()}</td>
    <td>${quantity}</td>
    <td>
      <div class="button-group">
        <button class="button product-update-button" name="product-update" type="button">수정</button>
        <button class="button product-delete-button" name="product-delete" type="button">삭제</button>
      </div>
    </td>
  `,

  productTableRows: products =>
    products.map(({ name, price, quantity }, index) => `
        <tr data-primary-key="${index}">
          ${template.productTableRowInners({ name, price, quantity })}
        </tr>`).join(''),

  productTableRowUpdate: ({ name, price, quantity }) => `
    <td><input type="text" name="name" placeholder="상품명" value="${name}"></td>
    <td><input type="number" name="price" placeholder="가격" value="${price}"></td>
    <td><input type="number" name="quantity" placeholder="수량" value="${quantity}"></td>
    <td>
      <div class="button-group">
        <button class="button product-update-confirm-button" name="product-update-confirm" type="button">확인</button>
        <button class="button product-update-cancel-button" name="product-update-cancel" type="button">취소</button>
      </div>
    </td>
  `,

  productPurchaseTableRowInners: ({ name, price, quantity }) => `
    <td>${name}</td>
    <td>${price.toLocaleString()}</td>
    <td>${quantity}</td>
    <td>
      <button class="button product-purchase-button" name="product-purchase" type="button">구매</button>
    </td>
  `,

  productPurchaseTableRows: products =>
    products.map(({ name, price, quantity }, index) => `
      <tr data-primary-key="${index}">
        ${template.productPurchaseTableRowInners({ name, price, quantity })}
      </tr>`).join(''),

  coinTableRows: coins =>
    coins.map((coin, index) => `
        <tr>
          <td>${COIN_TYPE[index]}원</td>
          <td>${coin.toLocaleString()}개</td>
        </tr>`).join(''),
};

export default template;
