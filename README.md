<p align="middle" >
  <img width="200px;" src="./images/popcorn.png"/>
</p>
<h2 align="middle">level1 - 자판기</h2>
<p align="middle">자바스크립트로 구현 하는 자판기 어플리케이션</p>
<p align="middle">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="template version"/>
  <img src="https://img.shields.io/badge/language-html-red.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/language-css-blue.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/language-js-yellow.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"/>
</p>

## STEP 1

### 요구사항

#### 1. 공통
- 도메인 영역을 타입스크립트를 이용하여 구현한다.
  - [x] Interface 또는 type을 이용하여, 주요 도메인 객체의 타입을 정의하고 설계한다.

<br>

#### 2. 라우팅 기능
- [x] Browser History Api를 이용하여 SPA처럼 라우팅을 적용한다.
  - [x] 매번 페이지를 로드 하는 것이 아닌, 히스토리를 관리하고, 페이지를 url에 따라 동적으로 렌더링한다
- [x] 상품 관리, 잔돈 충전, 상품 구매 페이지는 모두 동적으로 렌더링해야 한다.
- [x] 존재하지 않는 페이지에 접속하면 시작 페이지로 이동하는 버튼을 제공한다.

<br>

#### 3. 상품 관리 탭
상품 관리탭은 자판기가 보유하고 있는 상품을 추가하는 기능을 수행한다.

- [x] 최초 상품 목록은 비워진 상태이다.
- [x] 상품명, 가격, 수량을 입력해 상품을 추가할 수 있다.
  - [x] 상품명, 가격, 수량은 빈 값을 입력할 수 없다.
  - [x] 상품명은 최대 10글자까지 가능하다.
  - [x] 상품 가격은 100원부터 시작하며, 최대 10,000원까지 가능하다.
  - [x] 상품 가격은 10원으로 나누어 떨어져야 한다.
  - [x] 한 제품당 수량은 최소 1개 이상이어야 한다. 
  - [x] 한 제품당 수량은 최대 20개까지 넣을 수 있다.
  - [x] 동일한 이름의 상품을 추가하는 경우 오류가 발생한다.
- [x] 사용자는 추가한 상품을 확인할 수 있다.
- [x] 사용자는 추가한 상품을 수정, 삭제할 수 있다.
  - [x] 수정 시 상품명, 가격, 수량 정보 영역 자체가 인풋 영역으로 변경된다.
  - [x] 삭제 시 confirm을 활용하여 사용자에게 다시 한번 확인한다.


<br>

#### 4. 잔돈 충전 탭
- [x] 잔돈 충전탭은 자판기가 보유할 금액을 충전하는 기능을 수행한다.

- [x] 잔돈 충전 탭에서 최초 자판기가 보유한 금액은 0원이며, 각 동전의 개수는 0개이다.
- [x] 잔돈 충전 입력 요소에 충전할 금액을 입력한 후, 충전하기 버튼을 눌러 자판기 보유 금액을 충전할 수 있다.
- [x] 잔돈은 빈 값을 입력할 수 없다.
- [x] 잔돈은 자연수만 입력할 수 있다.
- [x] 잔돈은 10원으로 나누어 떨어지는 금액만 투입할 수 있다. 
- [x] 보유할 수 있는 최대 잔돈 금액은 100,000원이다.
- [x] 자판기 보유 금액만큼의 동전이 무작위로 생성된다.
- [x] 자판기 보유 금액을 누적하여 충전할 수 있다. 추가 충전 금액만큼의 동전이 무작위로 생성되어 기존 동전들에 더해진다.


<br>

#### 5. 테스트 요구사항
- [x] 비즈니스 로직에 대한 단위 테스트를 Jest로 작성한다.

<br>

## 📝 License

This project is [MIT](https://github.com/woowacourse/javascript-vendingmachine/blob/main/LICENSE) licensed.
