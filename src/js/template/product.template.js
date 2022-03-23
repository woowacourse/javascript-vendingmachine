const productTemplate = {
  input: () => `
    <form id="add-product-form">
        <label for="product-name-input">추가할 상품 정보를 입력해주세요.</label>
        <input id="product-name-input" placeholder="상품명"/>
        <input id="product-price-input" placeholder="가격" type="number"/>
        <input id="product-count-input" placeholder="수량" type="number"/>
        <button id="add-product-button button">추가</button>
    </form>
    <section id="product-status">

    </section>
  `,

  productStatus: (products) => `
      <h2>상품 현황</h2>
      <table>
        <thead>
          <tr>
            <th>상품명</th>
            <th>가격</th>
            <th>수량</th>
          </tr>
        </thead>
        <tbody>
        ${products
          .map(
            ({ name, price, count }, idx) => `
          <tr id=${idx}>
            <td>${name}</td>
            <td>${price}</td>
            <td>${count}</td>
          <tr>
          `
          )
          .join("")}
        </tbody>
      </table>
  `,
};

export default productTemplate;
