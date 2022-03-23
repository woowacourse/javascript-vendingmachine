const AddProductComponent = () => {
  return `
  <div id="product-manage-container">
    <p>추가할 상품 정보를 입력해주세요.</p>
    <form id="product-add-form">
      <input
        type="text"
        id="product-name-input"
        placeholder="상품명"
        required
      />
      <input
        type="number"
        id="product-price-input"
        placeholder="가격"
        required
      />
      <input
        type="number"
        id="product-amount-input"
        placeholder="수량"
        required
      />
      <input type="submit" id="product-add-button" value="추가" />
    </form>
  </div>`;
};

export default AddProductComponent;
