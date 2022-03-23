import Component from '../core/Component';

export default class App extends Component {
  template() {
    return '자판기';
  }
}

customElements.define('app-wrapper', App);
