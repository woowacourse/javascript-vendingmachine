const TEMPLATE = {
  PRODUCT_MANAGEMENT: `
    <section class="tab__product-manage-tab">
      <h2 hidden>상품 관리 화면</h2>
      <form class="product-manage-form">
        <fieldset>
          <legend>추가할 상품 정보를 입력해주세요.</legend>
          <input type="text" name="name" placeholder="상품명" maxlength="10" required />
          <input type="number" name="price" placeholder="가격" min="100" max="10000" required />
          <input type="number" name="quantity" placeholder="수량" min="1" max="20" required />
          <button type="submit" class="product-manage-form__add-button submit-button">추가</button>
        </fieldset>
      </form>
      <table id="product-list-table">
        <caption>
          상품 현황
        </caption>
        <thead>
          <tr>
            <th scope="col">상품명</th>
            <th scope="col">가격</th>
            <th scope="col">수량</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr class="product-item">
            <td>콜라</td>
            <td>1,000</td>
            <td>20</td>
            <td>
              <button type="button" class="product-item__edit-button button">수정</button>
              <button type="button" class="product-item__delete-button button">삭제</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  `,
};

export default TEMPLATE;
