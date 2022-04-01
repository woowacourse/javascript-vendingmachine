var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CoinVaultTable_target, _CoinVaultTable_coinVault, _CoinVaultTable_coin500Quantity, _CoinVaultTable_coin100Quantity, _CoinVaultTable_coin50Quantity, _CoinVaultTable_coin10Quantity;
export class CoinVaultTable {
    constructor(props) {
        _CoinVaultTable_target.set(this, void 0);
        _CoinVaultTable_coinVault.set(this, void 0);
        _CoinVaultTable_coin500Quantity.set(this, void 0);
        _CoinVaultTable_coin100Quantity.set(this, void 0);
        _CoinVaultTable_coin50Quantity.set(this, void 0);
        _CoinVaultTable_coin10Quantity.set(this, void 0);
        this.updateCoinVaultTableTemplate = () => {
            const { coin500, coin100, coin50, coin10 } = __classPrivateFieldGet(this, _CoinVaultTable_coinVault, "f").getCoins();
            __classPrivateFieldGet(this, _CoinVaultTable_coin500Quantity, "f").textContent = `${coin500}`;
            __classPrivateFieldGet(this, _CoinVaultTable_coin100Quantity, "f").textContent = `${coin100}`;
            __classPrivateFieldGet(this, _CoinVaultTable_coin50Quantity, "f").textContent = `${coin50}`;
            __classPrivateFieldGet(this, _CoinVaultTable_coin10Quantity, "f").textContent = `${coin10}`;
        };
        __classPrivateFieldSet(this, _CoinVaultTable_target, props.target, "f");
        __classPrivateFieldSet(this, _CoinVaultTable_coinVault, props.coinVault, "f");
        __classPrivateFieldGet(this, _CoinVaultTable_target, "f").addEventListener('coinCharged', this.updateCoinVaultTableTemplate);
    }
    render() {
        __classPrivateFieldGet(this, _CoinVaultTable_target, "f").insertAdjacentHTML('beforeend', this.template(__classPrivateFieldGet(this, _CoinVaultTable_coinVault, "f").getCoins()));
        this.selectDom();
    }
    template(coinsQuantity) {
        return `
      <div class="table-container">
        <h2>자판기가 보유한 동전</h2>
        <table id="coin-vault-table">
          <thead>
            <tr>
              <th>동전</th>
              <th>개수</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>500원</td>
              <td><span id="coin500-quantity">${coinsQuantity.coin500}</span>개</td>
            </tr>
            <tr>
              <td>100원</td>
              <td><span id="coin100-quantity">${coinsQuantity.coin100}</span>개</td>
            </tr>
            <tr>
              <td>50원</td>
              <td><span id="coin50-quantity">${coinsQuantity.coin50}</span>개</td>
            </tr>
            <tr>
              <td>10원</td>
              <td><span id="coin10-quantity">${coinsQuantity.coin10}</span>개</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
    }
    selectDom() {
        __classPrivateFieldSet(this, _CoinVaultTable_coin500Quantity, document.querySelector('#coin500-quantity'), "f");
        __classPrivateFieldSet(this, _CoinVaultTable_coin100Quantity, document.querySelector('#coin100-quantity'), "f");
        __classPrivateFieldSet(this, _CoinVaultTable_coin50Quantity, document.querySelector('#coin50-quantity'), "f");
        __classPrivateFieldSet(this, _CoinVaultTable_coin10Quantity, document.querySelector('#coin10-quantity'), "f");
    }
}
_CoinVaultTable_target = new WeakMap(), _CoinVaultTable_coinVault = new WeakMap(), _CoinVaultTable_coin500Quantity = new WeakMap(), _CoinVaultTable_coin100Quantity = new WeakMap(), _CoinVaultTable_coin50Quantity = new WeakMap(), _CoinVaultTable_coin10Quantity = new WeakMap();
//# sourceMappingURL=CoinVaultTable.js.map