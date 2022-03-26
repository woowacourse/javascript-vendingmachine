(()=>{"use strict";var t={44:(t,n,e)=>{e.d(n,{Z:()=>c});var r=e(537),o=e.n(r),i=e(645),a=e.n(i)()(o());a.push([t.id,'#app{width:600px;min-height:675px;height:100%;display:flex;flex-direction:column;align-items:center;margin:32px 0;background-color:#fff;border:1px solid #0000001f;border-radius:4px}input{padding:0 10px;height:36px;border:1px solid #b4b4b4;border-radius:4px}input::placeholder{color:#b8b8b8}.input-description{display:block;line-height:24px;margin-bottom:4px}.title{margin:44px 0 32px}.section-title{text-align:center;margin-bottom:16px;font-size:20px}.nav{margin-bottom:52px}.nav__button{width:117px;height:36px;background:#f5f5f5;border-radius:4px}.nav__button.active{background:#00bcd429}.grid-container{display:grid;grid-template-columns:repeat(2, 1fr);grid-auto-rows:40px}.grid-item{display:flex;justify-content:center;align-items:center;border-bottom:1px solid #dcdcdc}.grid-header{font-weight:600;border-top:1px solid #dcdcdc}.grid-button{width:80px;height:32px}.submit-button{width:56px;height:36px;background:#00bcd4;border-radius:4px;color:#fff;margin-left:8px}.input-section{margin-bottom:48px}.product-addition__input{width:120px}.product-inventory__container{grid-template-columns:repeat(5, 1fr);margin-bottom:48px}.product-inventory__input{width:87px;border:0;text-align:center;outline:0}.coin-charge__input{width:300px}.coin-charge__form{margin-bottom:20px}.coin-holdings{width:237px;margin:auto}*{margin:0;padding:0;box-sizing:border-box;font-family:"Roboto";font-style:normal}ol,ul{list-style:none}html,body{-webkit-font-smoothing:antialiased;background-color:#f9f9f9;display:flex;flex-direction:column;align-items:center}input,button,textarea,select{font:inherit}button{cursor:pointer;border:0}input[type=number]::-webkit-outer-spin-button,input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}',"",{version:3,sources:["webpack://./src/scss/app.scss","webpack://./src/scss/variable.scss","webpack://./src/scss/product-management.scss","webpack://./src/scss/coin-charge.scss","webpack://./src/scss/index.scss"],names:[],mappings:"AAEA,KACE,WAAA,CACA,gBAAA,CACA,WAAA,CACA,YAAA,CACA,qBAAA,CACA,kBAAA,CACA,aAAA,CACA,qBCJqB,CDKrB,0BAAA,CACA,iBAAA,CAGF,MACE,cAAA,CACA,WAAA,CACA,wBAAA,CACA,iBAAA,CAEA,mBACE,aCXsB,CDe1B,mBACE,aAAA,CACA,gBAAA,CACA,iBAAA,CAGF,OACE,kBAAA,CAGF,eACE,iBAAA,CACA,kBAAA,CACA,cAAA,CAGF,KACE,kBAAA,CAEA,aACE,WAAA,CACA,WAAA,CACA,kBCnCmB,CDoCnB,iBAAA,CAEA,oBACE,oBCnDkB,CDyDtB,gBACE,YAAA,CACA,oCAAA,CACA,mBAAA,CAGF,WACE,YAAA,CACA,sBAAA,CACA,kBAAA,CACA,+BAAA,CAGF,aACE,eAAA,CACA,4BAAA,CAGF,aACE,UAAA,CACA,WAAA,CAIJ,eACE,UAAA,CACA,WAAA,CACA,kBCrFoB,CDsFpB,iBAAA,CACA,UCzEwB,CD0ExB,eAAA,CAGF,eACE,kBAAA,CE3FA,yBACE,WAAA,CAKF,8BACE,oCAAA,CACA,kBAAA,CAGF,0BACE,UAAA,CACA,QAAA,CACA,iBAAA,CACA,SAAA,CCfF,oBACE,WAAA,CAGF,mBACE,kBAAA,CAIJ,eACE,WAAA,CACA,WAAA,CCVF,EACE,QAAA,CACA,SAAA,CACA,qBAAA,CACA,oBAAA,CACA,iBAAA,CAGF,MAEE,eAAA,CAGF,UAEE,kCAAA,CACA,wBHfsB,CGgBtB,YAAA,CACA,qBAAA,CACA,kBAAA,CAGF,6BAIE,YAAA,CAGF,OACE,cAAA,CACA,QAAA,CAGF,4FAEE,uBAAA,CACA,QAAA",sourcesContent:["@import 'variable';\n\n#app {\n  width: 600px;\n  min-height: 675px;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  margin: 32px 0;\n  background-color: $color-app-background;\n  border: 1px solid $color-app-border;\n  border-radius: 4px;\n}\n\ninput {\n  padding: 0 10px;\n  height: 36px;\n  border: 1px solid $color-input-background;\n  border-radius: 4px;\n\n  &::placeholder {\n    color: $color-input-placeholder;\n  }\n}\n\n.input-description {\n  display: block;\n  line-height: 24px;\n  margin-bottom: 4px;\n}\n\n.title {\n  margin: 44px 0 32px;\n}\n\n.section-title {\n  text-align: center;\n  margin-bottom: 16px;\n  font-size: 20px;\n}\n\n.nav {\n  margin-bottom: 52px;\n\n  &__button {\n    width: 117px;\n    height: 36px;\n    background: $color-button-default;\n    border-radius: 4px;\n\n    &.active {\n      background: $color-brand-secondary;\n    }\n  }\n}\n\n.grid {\n  &-container {\n    display: grid;\n    grid-template-columns: repeat(2, 1fr);\n    grid-auto-rows: 40px;\n  }\n\n  &-item {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    border-bottom: 1px solid $color-grid-border;\n  }\n\n  &-header {\n    font-weight: 600;\n    border-top: 1px solid $color-grid-border;\n  }\n\n  &-button {\n    width: 80px;\n    height: 32px;\n  }\n}\n\n.submit-button {\n  width: 56px;\n  height: 36px;\n  background: $color-brand-primary;\n  border-radius: 4px;\n  color: $color-button-text-color;\n  margin-left: 8px;\n}\n\n.input-section {\n  margin-bottom: 48px;\n}\n","$color-brand-primary: #00bcd4;\n$color-brand-secondary: #00bcd429;\n\n$color-page-background: #f9f9f9;\n\n$color-app-border: #0000001f;\n$color-app-background: #ffffff;\n\n$color-grid-border: #dcdcdc;\n\n$color-input-background: #b4b4b4;\n$color-input-placeholder: #b8b8b8;\n\n$color-button-default: #f5f5f5;\n$color-button-text-color: #ffffff;\n",".product-addition {\n  &__input {\n    width: 120px;\n  }\n}\n\n.product-inventory {\n  &__container {\n    grid-template-columns: repeat(5, 1fr);\n    margin-bottom: 48px;\n  }\n\n  &__input {\n    width: 87px;\n    border: 0;\n    text-align: center;\n    outline: 0;\n  }\n}\n",".coin-charge {\n  &__input {\n    width: 300px;\n  }\n\n  &__form {\n    margin-bottom: 20px;\n  }\n}\n\n.coin-holdings {\n  width: 237px;\n  margin: auto;\n}\n","@import 'app', 'product-management', 'coin-charge', 'variable';\n\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  font-family: 'Roboto';\n  font-style: normal;\n}\n\nol,\nul {\n  list-style: none;\n}\n\nhtml,\nbody {\n  -webkit-font-smoothing: antialiased;\n  background-color: $color-page-background;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\ninput,\nbutton,\ntextarea,\nselect {\n  font: inherit;\n}\n\nbutton {\n  cursor: pointer;\n  border: 0;\n}\n\ninput[type='number']::-webkit-outer-spin-button,\ninput[type='number']::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n"],sourceRoot:""}]);const c=a},645:t=>{t.exports=function(t){var n=[];return n.toString=function(){return this.map((function(n){var e="",r=void 0!==n[5];return n[4]&&(e+="@supports (".concat(n[4],") {")),n[2]&&(e+="@media ".concat(n[2]," {")),r&&(e+="@layer".concat(n[5].length>0?" ".concat(n[5]):""," {")),e+=t(n),r&&(e+="}"),n[2]&&(e+="}"),n[4]&&(e+="}"),e})).join("")},n.i=function(t,e,r,o,i){"string"==typeof t&&(t=[[null,t,void 0]]);var a={};if(r)for(var c=0;c<this.length;c++){var s=this[c][0];null!=s&&(a[s]=!0)}for(var d=0;d<t.length;d++){var u=[].concat(t[d]);r&&a[u[0]]||(void 0!==i&&(void 0===u[5]||(u[1]="@layer".concat(u[5].length>0?" ".concat(u[5]):""," {").concat(u[1],"}")),u[5]=i),e&&(u[2]?(u[1]="@media ".concat(u[2]," {").concat(u[1],"}"),u[2]=e):u[2]=e),o&&(u[4]?(u[1]="@supports (".concat(u[4],") {").concat(u[1],"}"),u[4]=o):u[4]="".concat(o)),n.push(u))}},n}},537:t=>{t.exports=function(t){var n=t[1],e=t[3];if(!e)return n;if("function"==typeof btoa){var r=btoa(unescape(encodeURIComponent(JSON.stringify(e)))),o="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(r),i="/*# ".concat(o," */"),a=e.sources.map((function(t){return"/*# sourceURL=".concat(e.sourceRoot||"").concat(t," */")}));return[n].concat(a).concat([i]).join("\n")}return[n].join("\n")}},379:t=>{var n=[];function e(t){for(var e=-1,r=0;r<n.length;r++)if(n[r].identifier===t){e=r;break}return e}function r(t,r){for(var i={},a=[],c=0;c<t.length;c++){var s=t[c],d=r.base?s[0]+r.base:s[0],u=i[d]||0,p="".concat(d," ").concat(u);i[d]=u+1;var l=e(p),A={css:s[1],media:s[2],sourceMap:s[3],supports:s[4],layer:s[5]};if(-1!==l)n[l].references++,n[l].updater(A);else{var m=o(A,r);r.byIndex=c,n.splice(c,0,{identifier:p,updater:m,references:1})}a.push(p)}return a}function o(t,n){var e=n.domAPI(n);return e.update(t),function(n){if(n){if(n.css===t.css&&n.media===t.media&&n.sourceMap===t.sourceMap&&n.supports===t.supports&&n.layer===t.layer)return;e.update(t=n)}else e.remove()}}t.exports=function(t,o){var i=r(t=t||[],o=o||{});return function(t){t=t||[];for(var a=0;a<i.length;a++){var c=e(i[a]);n[c].references--}for(var s=r(t,o),d=0;d<i.length;d++){var u=e(i[d]);0===n[u].references&&(n[u].updater(),n.splice(u,1))}i=s}}},569:t=>{var n={};t.exports=function(t,e){var r=function(t){if(void 0===n[t]){var e=document.querySelector(t);if(window.HTMLIFrameElement&&e instanceof window.HTMLIFrameElement)try{e=e.contentDocument.head}catch(t){e=null}n[t]=e}return n[t]}(t);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(e)}},216:t=>{t.exports=function(t){var n=document.createElement("style");return t.setAttributes(n,t.attributes),t.insert(n,t.options),n}},565:(t,n,e)=>{t.exports=function(t){var n=e.nc;n&&t.setAttribute("nonce",n)}},795:t=>{t.exports=function(t){var n=t.insertStyleElement(t);return{update:function(e){!function(t,n,e){var r="";e.supports&&(r+="@supports (".concat(e.supports,") {")),e.media&&(r+="@media ".concat(e.media," {"));var o=void 0!==e.layer;o&&(r+="@layer".concat(e.layer.length>0?" ".concat(e.layer):""," {")),r+=e.css,o&&(r+="}"),e.media&&(r+="}"),e.supports&&(r+="}");var i=e.sourceMap;i&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),n.styleTagTransform(r,t,n.options)}(n,t,e)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(n)}}}},589:t=>{t.exports=function(t,n){if(n.styleSheet)n.styleSheet.cssText=t;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(t))}}}},n={};function e(r){var o=n[r];if(void 0!==o)return o.exports;var i=n[r]={id:r,exports:{}};return t[r](i,i.exports,e),i.exports}e.n=t=>{var n=t&&t.__esModule?()=>t.default:()=>t;return e.d(n,{a:n}),n},e.d=(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},e.o=(t,n)=>Object.prototype.hasOwnProperty.call(t,n),(()=>{var t=e(379),n=e.n(t),r=e(795),o=e.n(r),i=e(569),a=e.n(i),c=e(565),s=e.n(c),d=e(216),u=e.n(d),p=e(589),l=e.n(p),A=e(44),m={};m.styleTagTransform=l(),m.setAttributes=s(),m.insert=a().bind(null,"head"),m.domAPI=o(),m.insertStyleElement=u(),n()(A.Z,m),A.Z&&A.Z.locals&&A.Z.locals;var h,f=function(t,n,e,r,o){if("m"===r)throw new TypeError("Private method is not writable");if("a"===r&&!o)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof n?t!==n||!o:!n.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===r?o.call(t,e):o?o.value=e:n.set(t,e),e},b=function(t,n,e,r){if("a"===e&&!r)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof n?t!==n||!r:!n.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===e?r:"a"===e?r.call(t):r?r.value:n.get(t)};class g{constructor(t){h.set(this,void 0),f(this,h,t,"f")}get name(){return b(this,h,"f").name}get product(){return b(this,h,"f")}editProduct(t){f(this,h,t,"f")}}h=new WeakMap;var v,C=function(t,n,e,r,o){if("m"===r)throw new TypeError("Private method is not writable");if("a"===r&&!o)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof n?t!==n||!o:!n.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===r?o.call(t,e):o?o.value=e:n.set(t,e),e},_=function(t,n,e,r){if("a"===e&&!r)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof n?t!==n||!r:!n.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===e?r:"a"===e?r.call(t):r?r.value:n.get(t)};class y{constructor(){v.set(this,void 0),C(this,v,[],"f")}get products(){return _(this,v,"f")}addProduct(t){_(this,v,"f").push(new g(t))}deleteProduct(t){C(this,v,_(this,v,"f").filter((n=>n.name!==t)),"f")}editProduct(t,n){_(this,v,"f").forEach((e=>{e.name===t&&e.editProduct(n)}))}}v=new WeakMap;const w={MIN:100,MAX:1e4,UNIT:10},E=[500,100,50,10],x={MIN:1,MAX:1e5,UNIT:10},k={ERROR_SAME_PRODUCT:"이미 동일한 이름의 상품이 존재합니다.",ERROR_OVER_MAX_LENGTH:"상품명을 10글자 이하로 입력해주세요.",ERROR_INVALID_PRICE:`가격은 ${w.MIN}원 이상 ${w.MAX.toLocaleString()}원 이하여야 하며, ${w.UNIT}으로 나누어 떨어져야 합니다.`,ERROR_OVER_MAX_QUANTITY:"상품 수량은 1개 이상 20개 이하로 입력해주세요.",ERROR_EMPTY_VALUE:"상품 정보를 공백 없이 입력해주세요.",ERROR_INVALID_CASH:`금액은 ${x.MAX.toLocaleString()}원 이하여야 하며, ${x.UNIT}으로 나누어 떨어져야 합니다.`,CONFIRM_DELETE_PRODUCT:"을(를) 삭제하시겠습니까?"};var M,B,T=function(t,n,e,r,o){if("m"===r)throw new TypeError("Private method is not writable");if("a"===r&&!o)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof n?t!==n||!o:!n.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===r?o.call(t,e):o?o.value=e:n.set(t,e),e},R=function(t,n,e,r){if("a"===e&&!r)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof n?t!==n||!r:!n.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===e?r:"a"===e?r.call(t):r?r.value:n.get(t)};class I{constructor(){M.set(this,void 0),B.set(this,void 0),T(this,M,0,"f"),T(this,B,{},"f"),E.forEach((t=>R(this,B,"f")[t]=0))}get totalCash(){return R(this,M,"f")}get coins(){return R(this,B,"f")}addCash(t){T(this,M,R(this,M,"f")+t,"f"),this.addCoins(t)}addCoins(t){for(;t>0;){const e=(n=E,Math.floor(Math.random()*n.length)),r=E[e];r>t||(R(this,B,"f")[r]+=1,t-=r)}var n}}M=new WeakMap,B=new WeakMap;const $=(t,n=document)=>n.querySelector(t),D=(t,n=document)=>n.querySelectorAll(t),P=(t,n)=>{t.replaceChildren(),t.insertAdjacentHTML("beforeend",n)};class N{constructor(t){this.coinDomain=t,this.render()}render(){P($(".coin-holdings__container"),this.template())}template(){const{coins:t}=this.coinDomain;return'\n      <div class="coin-holdings__item grid-item grid-header">동전</div>\n      <div class="coin-holdings__item grid-item grid-header">개수</div>\n    '+Object.keys(t).reverse().map((n=>`\n        <div class="coin-holdings__item grid-item">${n}원</div>\n        <div class="coin-holdings__item grid-item">${t[n]}개</div>\n      `)).join("")}}var O,U,F=function(t,n,e,r,o){if("m"===r)throw new TypeError("Private method is not writable");if("a"===r&&!o)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof n?t!==n||!o:!n.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===r?o.call(t,e):o?o.value=e:n.set(t,e),e},L=function(t,n,e,r){if("a"===e&&!r)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof n?t!==n||!r:!n.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===e?r:"a"===e?r.call(t):r?r.value:n.get(t)};O=new WeakMap,U=new WeakMap;const H=new class{constructor(){O.set(this,void 0),U.set(this,void 0)}set productInventoryUI(t){F(this,O,t,"f")}set coinHoldingsUI(t){F(this,U,t,"f")}renderProducts(){L(this,O,"f").render()}renderCoins(){L(this,U,"f").render()}},j=(t,n)=>{const{MIN:e,MAX:r,UNIT:o}=n;return!(t>=e&&t<=r&&t%o==0)};class S{constructor(t){this.submitHandler=t=>{if(t.preventDefault(),!(t.target instanceof HTMLFormElement))return;const n=t.target.elements.namedItem("cashInput").valueAsNumber;try{(t=>{if(j(t,x))throw new Error(k.ERROR_INVALID_CASH)})(n)}catch({message:t}){return void alert(t)}this.coinDomain.addCash(n),$(".coin-charge__total-cash").textContent=this.coinDomain.totalCash,H.renderCoins()},this.coinDomain=t,$(".coin-charge__form").addEventListener("submit",this.submitHandler),$(".coin-charge__input").focus()}}class q{constructor(t){this.coinDomain=t}render(){P($("#main-content"),this.template()),this.bindDOM()}template(){return'\n      <section class="coin-charge input-section">\n        <h2 hidden>충전할 금액 입력</h2>\n        <form class="coin-charge__form">\n          <label\n            class="coin-charge__description input-description"\n            for="cash-amount"\n          >\n            자판기가 보유할 금액을 입력해주세요.\n          </label>\n          <input\n            type="number"\n            id="cash-amount"\n            class="coin-charge__input"\n            placeholder="금액"\n            name="cashInput"\n          />\n          <button class="coin-charge__button submit-button">충전</button>\n        </form>\n        <p class="coin-charge__total-cash-description">현재 보유 금액: <span class="coin-charge__total-cash">0</span>원</p>\n      </section>\n      <section class="coin-holdings">\n        <h2 class="coin-holdings__title section-title">자판기가 보유한 동전</h2>\n        <div class="coin-holdings__container grid-container"></div>\n      </section>\n    '}bindDOM(){new S(this.coinDomain);const t=new N(this.coinDomain);H.coinHoldingsUI=t}}const G=t=>{let n;return{isEmpty:Object.keys(t).some((e=>(n=e,"number"==typeof t[e]?Number.isNaN(t[e]):""===t[e].trim()))),target:n}},W=(t,n,e=null)=>t.some((t=>t.name!==e&&t.name===n.name)),V=(t,n,e=null)=>{const r=((t,n,e=null)=>{return[{test:G(n).isEmpty,errorMsg:k.ERROR_EMPTY_VALUE,target:G(n).target},{test:W(t,n,e),errorMsg:k.ERROR_SAME_PRODUCT,target:"name"},{test:(o=n.name,o.length>10),errorMsg:k.ERROR_OVER_MAX_LENGTH,target:"name"},{test:j(n.price,w),errorMsg:k.ERROR_INVALID_PRICE,target:"price"},{test:(r=n.quantity,r>20||r<=0),errorMsg:k.ERROR_OVER_MAX_QUANTITY,target:"quantity"}];var r,o})(t,n,e);return r.every((({test:t,errorMsg:n,target:e})=>{if(t){const t=new Error(n);throw t.name=e,t}return!0}))};class X{constructor(t){this.submitHandler=t=>{if(t.preventDefault(),!(t.target instanceof HTMLFormElement))return;const n=t.target.elements,e={name:n.namedItem("name"),price:n.namedItem("price"),quantity:n.namedItem("quantity")},r={name:e.name.value,price:e.price.valueAsNumber,quantity:e.quantity.valueAsNumber};try{const{products:t}=this.productDomain;V(t,r)}catch({name:t,message:n}){return this.focusOnInvalidInput(t,e),void alert(n)}this.productDomain.addProduct(r),H.renderProducts()},this.productDomain=t,$(".product-addition__form").addEventListener("submit",this.submitHandler),$(".product-addition__input").focus()}focusOnInvalidInput(t,n){switch(t){case"name":n.name.focus();break;case"price":n.price.focus();break;case"quantity":n.quantity.focus()}}}class Y{constructor(t){this.enterForEditHandler=t=>{if("Enter"!==t.key)return;if(!(t.target instanceof HTMLElement))return;const n=$(`button[data-product-name=${t.target.dataset.productName}]`);this.finishEditMode(n)},this.buttonClickHandler=t=>{const{target:n}=t;if(n instanceof HTMLButtonElement)switch(n.innerText){case"수정":this.activateEditMode(n);break;case"확인":this.finishEditMode(n);break;case"삭제":const{productName:t}=n.dataset;if(!confirm(`🥤${t}🥤${k.CONFIRM_DELETE_PRODUCT}`))return;this.deleteProduct(t)}},this.$container=$(".product-inventory__container"),this.productDomain=t,this.render(),this.$container.addEventListener("click",this.buttonClickHandler)}render(){P(this.$container,this.template()),D(".product-inventory__input").forEach((t=>t.addEventListener("keydown",this.enterForEditHandler)))}template(){const{products:t}=this.productDomain;return'\n      <div class="product-inventory__item grid-item grid-header">\n        상품명\n      </div>\n      <div class="product-inventory__item grid-item grid-header">\n        가격(원)\n      </div>\n      <div class="product-inventory__item grid-item grid-header">\n        수량\n      </div>\n      <div class="product-inventory__item grid-item grid-header"></div>\n      <div class="product-inventory__item grid-item grid-header"></div>\n    '+t.map((t=>{const{name:n,price:e,quantity:r}=t.product;return`\n          <div class="product-inventory__item grid-item" data-product-name="${n}">\n            <input class="product-inventory__input" value="${n}" data-product-name="${n}" readonly />\n          </div>\n          <div class="product-inventory__item grid-item" data-product-name="${n}">\n            <input type="number" class="product-inventory__input" value="${e}" data-product-name="${n}" readonly />\n          </div>\n          <div class="product-inventory__item grid-item" data-product-name="${n}">\n            <input type="number" class="product-inventory__input" value="${r}" data-product-name="${n}" readonly />\n          </div>\n          <div class="product-inventory__item grid-item" data-product-name="${n}">\n            <button\n              type="button"\n              data-product-name="${n}"\n              class="product-inventory__button product-inventory__edit-button grid-button"\n            >\n              수정\n            </button>\n          </div>\n          <div class="product-inventory__item grid-item" data-product-name="${n}">\n            <button\n              type="button"\n              data-product-name="${n}"\n              class="product-inventory__button product-inventory__delete-button grid-button"\n            >\n              삭제\n            </button>\n          </div>\n        `})).join("")}activateEditMode(t){t.innerText="확인";const n=D(`input[data-product-name="${t.dataset.productName}"]`);n.forEach((t=>{t.removeAttribute("readonly")})),n[0].focus()}deactivateEditMode(t){t.innerText="수정",D(`input[data-product-name="${t.dataset.productName}"]`).forEach((t=>{t.setAttribute("readonly","")}))}finishEditMode(t){const n=t.dataset.productName,e=D(`input[data-product-name="${n}"]`),r={name:e[0].value,price:e[1].valueAsNumber,quantity:e[2].valueAsNumber};try{const{products:t}=this.productDomain;V(t,r,n)}catch({message:t}){return void alert(t)}this.productDomain.editProduct(t.dataset.productName,r),this.deactivateEditMode(t),H.renderProducts()}deleteProduct(t){this.productDomain.deleteProduct(t),D(`div[data-product-name="${t}"]`).forEach((t=>t.remove()))}}class Q{constructor(t){this.productDomain=t}render(){P($("#main-content"),this.template()),this.bindDOM()}template(){return'\n      <section class="product-addition input-section">\n        <h2 hidden>추가할 상품 입력</h2>\n        <form class="product-addition__form">\n          <label\n            class="product-addition__description input-description"\n            for="product-name"\n          >\n            추가할 상품 정보를 입력해주세요.\n          </label>\n          <input\n            id="product-name"\n            class="product-addition__input"\n            name="name"\n            placeholder="상품명"\n          />\n          <input\n            type="number"\n            class="product-addition__input"\n            name="price"\n            placeholder="가격"\n          />\n          <input\n            type="number"\n            class="product-addition__input"\n            name="quantity"\n            placeholder="수량"\n          />\n          <button class="product-addition__button submit-button">추가</button>\n        </form>\n      </section>\n      <section class="product-inventory">\n        <h2 class="product-inventory__title section-title">상품 현황</h2>\n        <div class="product-inventory__container grid-container"></div>\n      </section>\n    '}bindDOM(){new X(this.productDomain);const t=new Y(this.productDomain);H.productInventoryUI=t}}class z{render(){P($("#main-content"),this.template()),this.bindDOM()}template(){return"\n      <div>Product Purchase (Step2 구현 예정!)</div>\n    "}bindDOM(){}}const J="/javascript-vendingmachine";new class{constructor(){this.navClickHandler=({target:t})=>{if("BUTTON"!==t.tagName)return;const n=`${J}${t.dataset.pathname}`;history.pushState({},"",n||"/"),this.activateClickedButton(n),this.renderMainContent(n)},this.popStateHandler=()=>{this.activateClickedButton(location.pathname),this.renderMainContent(location.pathname)},this.productDomain=new y,this.coinDomain=new I,this.productManagementUI=new Q(this.productDomain),this.coinManagementUI=new q(this.coinDomain),this.productPurchaseUI=new z,this.productManagementUI.render(),$(".nav").addEventListener("click",this.navClickHandler),window.addEventListener("popstate",this.popStateHandler)}activateClickedButton(t){D(".nav__button").forEach((n=>{this.checkMatchPathname(n.dataset.pathname,t.replace(J,""))?n.classList.add("active"):n.classList.remove("active")}))}checkMatchPathname(t,n){return t===n}renderMainContent(t){switch(t){case`${J}`:this.productManagementUI.render();break;case`${J}/charge`:this.coinManagementUI.render();break;case`${J}/purchase`:this.productPurchaseUI.render()}}}})()})();
//# sourceMappingURL=bundle.js.map