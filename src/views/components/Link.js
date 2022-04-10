import Component from '../../core/Component';
import { jumpTo } from '../../utils/domUtils';

class Link extends Component {
  template() {
    return this.textContent;
  }

  setEvent() {
    const { href } = this.props;

    this.onclick = () => {
      jumpTo(href);
    };
  }
}

customElements.define('a-link', Link);
