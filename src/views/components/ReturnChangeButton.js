import Component from '../../core/Component';

export default class ReturnChangeButton extends Component {
  template() {
    return `
      <button class="styled-button">반환</button>
    `;
  }
}

customElements.define('return-button', ReturnChangeButton);
