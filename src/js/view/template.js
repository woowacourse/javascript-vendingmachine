export const templateA = `<section title="상품 정보">
<form id="add-product-form">
  <fieldset>
    <legend>추가할 상품 정보를 입력해주세요.</legend>
    <input type="text" id="product-name" placeholder="상품명"/>
    <input type="number" id="product-price" placeholder="가격" min="0" max="100000" />
    <input type="number" id="product-stock" placeholder="수량" min="0" max="20" />
    <button type="submit" class="submit-button">추가</button>
  </fieldset>
</form>
</section>
<section class="table-section" title="상품 현황">
<table>
  <caption>
    상품 현황
  </caption>
  <tr>
    <th>상품명</th>
    <th>가격</th>
    <th>수량</th>
    <th>관리</th>
  </tr>
  <tr>
    <td>콜라</td>
    <td>1500</td>
    <td>20</td>
    <td>
      <div class="table-button-wrapper">
        <button type="button">수정</button>
        <button type="button">삭제</button>
        <button type="button" class="confirm-update-button" hidden>
          확인
        </button>
      </div>
    </td>
  </tr>
  <tr>
    <td>사이다</td>
    <td>1000</td>
    <td>10</td>
    <td>
      <div class="table-button-wrapper">
        <button type="button" hidden>수정</button>
        <button type="button" hidden>삭제</button>
        <button type="button" class="confirm-update-button">
          확인
        </button>
      </div>
    </td>
  </tr>
</table>
</section>`;

export const templateB = `<section title="잔돈 충전">
<form id="add-change-form">
  <label for="">자판기가 보유할 금액을 입력해주세요</label>
  <div>
    <input type="number" id="money-input" placeholder="금액" />
    <button type="submit" class="submit-button">충전</button>
  </div>
</form>
<p >현재 보유 금액: <span id="total-change"></span>원</p>
</section>
<section class="table-section" title="자판기 현황">
<table>
  <caption>
    자판기가 보유한 동전
  </caption>
  <tr>
    <th>동전</th>
    <th>개수</th>
  </tr>
  <tr>
    <td>500원</td>
    <td>0개</td>
  </tr>
  <tr>
    <td>100원</td>
    <td>4개</td>
  </tr>
  <tr>
    <td>50원</td>
    <td>1개</td>
  </tr>
  <tr>
    <td>10원</td>
    <td>5개</td>
  </tr>
</table>
</section>`;

export const templateC = '<div>아직 공사중입니다 🚫</div>';
