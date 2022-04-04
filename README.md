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

## 👨🏻‍💻 데모 페이지

[링크](https://woojeongmin.com/javascript-vendingmachine/)

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

## 1단계 요구 사항

### 기능

- #### 상품 관리

  - 상품 추가
    - 이름
    - 가격
    - 수량
    - 만약 추가된 상품명이 기존에 존재하면 기존 상품의 가격을 새로운 가격으로 갱신하고 수량을 추가한다.
  - 상품 수정
  - 상품 삭제

- #### 잔돈 관리

  - 잔돈 충전
    - 동전 추가
      - 보유할 수 있는 최대 금액은 100000원
      - 입력 최소 금액은 10원
      - 10원 단위로 입력
    - 동전 생성

- #### 유효성 검사

  - 추가되는 상품
    - 이름
      - 최대 10글자
    - 가격
      - 100원부터 10000원까지
      - 10원 단위
    - 수량
      - 최대 20개
  - 추가되는 잔돈

- #### 유틸

  - 무작위 생성
    - 10, 50, 100, 500원 동전으로 이루어진다

### UI

[figma 시안](https://www.figma.com/file/n5KChtJXbmUqPimfgZzAZH/?node-id=4:35)을 기준으로 구현한다.

- #### 상품 관리탭

  - 최초 상품 목록은 비워진 상태이다.
  - 상품명, 가격, 수량을 입력해 상품을 추가할 수 있다.
  - 관리자는 추가한 상품을 확인할 수 있다.
  - 수정 시 상품명, 가격, 수량 정보 영역 자체가 인풋 영역으로 변경된다.
  - 삭제 시 confirm을 활용하여 사용자에게 다시 한번 확인한다.

- #### 잔돈 충전탭

  - 잔돈 충전 탭에서 최초 자판기가 보유한 금액은 0원이며, 각 동전의 개수는 0개이다.
  - 잔돈 충전 입력 요소에 충전할 금액을 입력한 후, 충전하기 버튼을 눌러 자판기 보유 금액을 충전할 수 있다.
  - 현재 보유 금액을 확인할 수 있다.
  - 현재 보유 동전 현황을 확인할 수 있다.

## 2단계 요구사항

### 기능

- #### 상품 구매

  - 금액 투입
    - 금액은 10원 단위
    - 최대 투입 금액은 10,000원
    - 금액은 누적으로 투입할 수 있다.
  - 상품 구매
    - 구입할 상품의 가격이 투입 금액 이하이면 상품을 구매할 수 있다.
    - 구입할 상품의 가격이 투입 금액보다 크면 상품을 구매할 수 없다.
    - 상품을 구매하면 투입 금액에서 상품 가격을 제한다.
  - 잔돈 반환
    - 잔돈을 돌려줄 때는 현재 보유한 최소 개수의 동전으로 잔돈을 돌려준다.
    - 지폐를 잔돈으로 반환하는 경우는 없다고 가정한다.
    - 잔돈을 반환할 수 없는 경우 잔돈으로 반환할 수 있는 금액만 반환한다.

- #### 관리자 회원 기능

  - 관리자의 회원 가입을 위한 기능은 [json-server-auth](https://www.npmjs.com/package/json-server-auth)를 이용한다.
  - 주어진 name, password로 회원 가입을 할 수 있다.
    - name은 2~6 글자
    - password는 실 서비스를 참고해서 규칙을 정한다.
  - name, password로 로그인할 수 있다.
  - 로그인한 유저는 정보의 수정이 가능하다.
  - 로그아웃할 수 있다.

- #### auth

### UI

[figma](https://www.figma.com/file/uduGjrly94dKOdzUmAXU0Q/%EB%A0%88%EB%B2%A81-%EB%AF%B8%EC%85%98-%EB%94%94%EC%9E%90%EC%9D%B8?node-id=4:35) 시안을 기준으로 구현한다.

- #### 상품 구매 탭

  - `상품 구매` 페이지에서 최초 충전 금액은 0원이며, 반환된 각 동전의 개수는 0개이다.
  - 사용자는 투입할 금액 입력 요소에 투입 금액을 입력한 후, `투입하기` 버튼을 이용하여 금액을 투입한다.
  - 사용자는 `반환하기` 버튼을 통해 잔돈을 반환 받을 수 있다.
  - 사용자가 버튼을 클릭했을 때 해당 행위가 정상적으로 동작하거나, 실패하였음을 `snackbar`를 통해 보여준다.

- #### 비로그인 유저의 화면

- #### 로그인 유저의 화면

- #### 회원가입 페이지

- #### 로그인 페이지

- #### 회원 정보 수정

### UI

<br>

## 👏 Contributing

만약 미션 수행 중에 개선사항이 보인다면, 언제든 자유롭게 PR을 보내주세요.

<br>

## 🐞 Bug Report

버그를 발견한다면, [Issues](https://github.com/woowacourse/javascript-vendingmachine/issues)에 등록해주세요.

<br>

## 📝 License

This project is [MIT](https://github.com/woowacourse/javascript-vendingmachine/blob/main/LICENSE) licensed.
