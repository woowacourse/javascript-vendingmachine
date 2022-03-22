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

## 요구 사항

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

<br>

## 👏 Contributing

만약 미션 수행 중에 개선사항이 보인다면, 언제든 자유롭게 PR을 보내주세요.

<br>

## 🐞 Bug Report

버그를 발견한다면, [Issues](https://github.com/woowacourse/javascript-vendingmachine/issues)에 등록해주세요.

<br>

## 📝 License

This project is [MIT](https://github.com/woowacourse/javascript-vendingmachine/blob/main/LICENSE) licensed.
