module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    // 사용되지 않는 변수는 에러를 노출하여, 불필요한 변수의 생성 및 import를 제어한다.
    "no-var": "error",
    // indent 조건을 지키기 위해 다음 라인을 추가
    "max-depth": ["error", 2],
    // console.log는 제거
    "no-console": "warn",
    // param을 재할당하는 것은 anti-pattern이라고 생각함
    // > 수정: param 전체가 아닌 그 prop 값은 변경 할 수 있도록 수정
    "no-param-reassign": [
      "error",
      {
        props: false,
      },
    ],
    "linebreak-style": "off",
    "import/extensions": "off",
    "no-alert": "off",
    "operator-linebreak": "off",
    "comma-dangle": "off",
    "object-curly-newline": "off",
    "class-methods-use-this": "off",
    "implicit-arrow-linebreak": "off",
    "consistent-return": "off",
    "object-shorthand": "off",
  },
};
