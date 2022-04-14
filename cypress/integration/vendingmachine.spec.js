describe('구현 결과가 요구사항과 일치해야 한다.', () => {
  const baseUrl = './index.html';
  const email =  'test@test.com'
  const password = 'Test1234@'
  const name = '테스트'

  before(() => {
    cy.clearLocalStorageSnapshot();
    cy.visit(baseUrl);
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('로그인 후, 유저 이름의 첫글자가 썸네일처럼 화면에 보여준다.', () => {
      // 로그인
      cy.get('#account-login-button').click()
      cy.get('#login-email').type(email)
      cy.get('#login-password').type(password)
      cy.get('#login-form').submit()
      cy.get('#name-thumbnail').should('have.text', '테')
  });

  it('로그인 한 유저는 상품을 추가할 수 있다. 추가한 상품은 화면에 보여 준다. 추가한 상품을 수정 하면 수정된 내역이 화면에 보여 준다.', () => {
    const productName = '콜라'
    const productPrice = 2000
    const productAmount = 10
    const changedProductName = '사이다'

    // 상품 추가
    cy.get('#product-name-input').type(productName)
    cy.get('#product-price-input').type(productPrice)
    cy.get('#product-amount-input').type(productAmount)
    cy.get('#product-add-form').submit()

    // 상품 화면 노출
    cy.get('#product-list').children('li:last').then(($li)=>{
      cy.get($li).children('.product-name').should('have.text', productName)
      cy.get($li).children('.product-price').should('have.text', productPrice)
      cy.get($li).children('.product-amount').should('have.text', productAmount)

      // 수정 버튼 클릭
      cy.get($li).children('.product-control-buttons').children('.product-modify-button').click()
    })

    // 상품명 수정
    cy.get('#product-list').children('li:last').then(($li)=>{
      cy.get($li).children('span:first').children('.product-name-modify-input').clear().type(changedProductName)
      cy.get($li).children('span:last').children('.product-modify-submit-button').click()
    })

    // 수정된 상품명 화면 노출
    cy.get('#product-list').children('li:last').then(($li)=>{
      cy.get($li).children('.product-name').should('have.text', changedProductName)
      cy.get($li).children('.product-price').should('have.text', productPrice)
      cy.get($li).children('.product-amount').should('have.text', productAmount)
    })
  });

  it('잔돈 충전 탭을 누르면 잔돈 충전 페이지로 이동하고, 잔돈을 누적으로 충전 할 수 있다. 누적된 금액은 화면에 보여준다.', () => {
    const money = [5000, 2000, 1000]
    const totalMoney = money.reduce((prev, m) => prev + m).toLocaleString()

    // 잔돈 충전 페이지로 이동
    cy.get('#change-add-button').click()

    // 잔돈 충전
    money.forEach(m => {
      cy.get('#money-add-input').clear().type(m)
      cy.get('#money-add-form').submit()  
    })
    
    // 누적된 금액 화면에 노출
    cy.get('#total-money').should('have.text', totalMoney)
  });

  it('상품 구매 탭을 누르면 상품 구매 페이지로 이동하고, 상품을 구입할 돈을 누적 입력 하면 누적된 금액이 화면에 보여준다.', () => {
    const money = [3000, 150, 1020, 2000]
    const totalMoney = money.reduce((prev, m) => prev + m).toLocaleString()

    // 상품 구매 페이지 이동
    cy.get('#product-purchase-button').click()

    // 금액 투입
    money.forEach(m => {
      cy.get('#money-add-input').clear().type(m)
      cy.get('#money-add-form').submit()  
    })
    
    // 누적된 금액 화면에 노출
    cy.get('#total-money').should('have.text', totalMoney)
  });

  it('상품을 구매 할 수 있다. 구매한 금액 만큼 투입한 금액의 차액이 화면에 보여준다.', () => {
    cy.get('#total-money').then(($totalMoney) => {
      // 상품 구매 하기 전, 투입한 금액
      const beforeTotalMoney = parseInt($totalMoney.text().replace(/,/g , ''))

      cy.get('#product-list').children('li:last').then(($li)=>{
        cy.get($li).children('.product-price').then(($ele)=>{
          // 구매 할 상품의 가격
          const price = parseInt($ele.text())

          // 상품 구매
          cy.get($li).children('span:last').children('.product-purchase-submit-button').click()
          // 상품 구매 할 수량
          cy.get('.select-quantity-box').children('.select-quantity-up-button').click()

          cy.get('#select-quantity').then(($selectQuantity)=>{
            // 구매한 상품의 수량
            const selectQuantity = parseInt($selectQuantity.val())
            // 구매한 차액
            const priceAmount = beforeTotalMoney - (price * selectQuantity)

            // 상품 구매 완료 버튼 
            cy.get('.dialog-purchase-button').click()    

            cy.get('#total-money').then(($totalMoney) => {
              const afterTotalMoney = parseInt($totalMoney.text().replace(/,/g , ''))

              // 화면에 보이는 투입한 금액과 차액이 같은지 비교
              expect(afterTotalMoney).to.equal(priceAmount)
            })
          })
        })
      })
    })
  });
});
