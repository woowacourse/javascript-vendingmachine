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

## ⚙️ Before Started

#### 개발 환경 가이드

개발 중에는 아래 명령어를 사용하여 webpack dev server를 띄워 현재 개발 중인 어플리케이션을 확인할 수 있습니다.

```
npm run start
```

별도로 빌드를 해야 한다면 아래 명령어를 사용해주세요

```
npm run build
```

<br>

## 📍 학습 목표

프레임워크 없이 SPA를 직접 구현해보며 SPA가 해결하고자 하는 문제에 대해 고민해본다.

TypeScript의 기본 문법을 익히며 필요성을 경험해보고, 객체 지향적 관점에서 활용해볼 수 있다.

## 🎯 요구사항 - 관리자 기능

1. 공통
   도메인 영역을 타입스크립트를 이용하여 구현한다.

- [x] Interface 또는 type을 이용하여, 주요 도메인 객체의 타입을 정의하고 설계한다.

2. 라우팅 기능

- [ ] Browser History Api를 이용하여 SPA처럼 라우팅을 적용한다.
  - [ ] 매번 페이지를 로드 하는 것이 아닌, 히스토리를 관리하고, 페이지를 url에 따라 동적으로 렌더링한다
- [ ] 상품 관리, 잔돈 충전, 상품 구매 페이지는 모두 동적으로 렌더링해야 한다.

3. 상품 관리 탭
   상품 관리탭은 자판기가 보유하고 있는 상품을 추가하는 기능을 수행한다.

- [ ] 최초 상품 목록은 비워진 상태이다.
- [ ] 상품명, 가격, 수량을 입력해 상품을 추가할 수 있다.
  - 상품명은 최대 10글자까지 가능하다.
  - 상품 가격은 100원부터 시작하며, 최대 10,000원까지 가능하다. 그리고 10원으로 나누어 떨어져야 한다.
  - 한 제품당 수량은 최대 20개까지 넣을 수있다.
- [ ] 관리자는 추가한 상품을 확인할 수 있다.
- [ ] 관리자는 추가한 상품을 수정, 삭제할 수 있다.
  - [ ] 수정 시 상품명, 가격, 수량 정보 영역 자체가 인풋 영역으로 변경된다.
  - [ ] 삭제 시 confirm을 활용하여 사용자에게 다시 한번 확인한다.

4. 잔돈 충전 탭
   잔돈 충전탭은 자판기가 보유할 금액을 충전하는 기능을 수행한다.

- [ ] 잔돈 충전 탭에서 최초 자판기가 보유한 금액은 0원이며, 각 동전의 개수는 0개이다.
- [ ] 잔돈 충전 입력 요소에 충전할 금액을 입력한 후, 충전하기 버튼을 눌러 자판기 보유 금액을 충전할 수 있다.
- [ ] 잔돈은 10원으로 나누어 떨어지는 금액만 투입할 수 있다. 보유할 수 있는 최대 금액은 100,000원이다.
- [ ] 자판기 보유 금액만큼의 동전이 무작위로 생성된다.
- [ ] 자판기 보유 금액을 누적하여 충전할 수 있다. 추가 충전 금액만큼의 동전이 무작위로 생성되어 기존 동전들에 더해진다.

## 테스트 요구사항

- [ ] 비즈니스 로직에 대한 단위 테스트를 Jest로 작성한다.

## UI

- [ ] figma 시안을 기준으로 구현한다

https://www.figma.com/file/n5KChtJXbmUqPimfgZzAZH/%EB%A0%88%EB%B2%A81-%EB%AF%B8%EC%85%98-%EB%94%94%EC%9E%90%EC%9D%B8-(beta)?node-id=4%3A35

## 👏 Contributing

만약 미션 수행 중에 개선사항이 보인다면, 언제든 자유롭게 PR을 보내주세요.

<br>

## 🐞 Bug Report

버그를 발견한다면, [Issues](https://github.com/woowacourse/javascript-vendingmachine/issues)에 등록해주세요.

<br>

## 📝 License

This project is [MIT](https://github.com/woowacourse/javascript-vendingmachine/blob/main/LICENSE) licensed.
