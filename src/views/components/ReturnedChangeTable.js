import Component from '../../core/Component';
import { vendingMachine } from '../../domains/VendingMachine';

export default class ReturnedChangeTable extends Component {
  template() {
    const returnedChange = vendingMachine.useStore(
      (state) => state.returnedChange
    );
    const coinArray = [...Object.entries(returnedChange)].sort(
      ([a], [b]) => b - a
    );

    return `
      <div class="returned-change-container">
        <table class="styled-table">
          <thead>
            <tr class="styled-tr">
              <th class="styled-th">동전</th>
              <th class="styled-th">개수</th>
            </tr>
          </thead>
          <tbody>
            ${coinArray
              .map(
                ([key, value]) => `
                  <tr class="styled-tr">
                    <td class="styled-td">${key}원</td>
                    <td class="styled-td">${value}개</td>
                  </tr>
                `
              )
              .join('')}
          </tbody>
        </table>
        <button id="return-change-button" class="return-change-button styled-button">반환</button>
      </div>
    `;
  }

  setEvent() {
    this.addEvent('click', '#return-change-button', () => {
      try {
        vendingMachine.returnChange();
      } catch (err) {
        document.querySelector('#snackbar').trigger(err.message);
      }
    });
  }
}

customElements.define('change-table', ReturnedChangeTable);
