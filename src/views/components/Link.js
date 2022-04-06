import Component from '../../core/Component';

export default class Link extends Component {
  template() {
    return this.textContent;
  }

  setEvent() {
    const { href } = this.props;

    this.onclick = () => {
      const state = {};

      window.history.pushState(state, '', href);
      dispatchEvent(new PopStateEvent('popstate', { state }));
    };
  }
}

customElements.define('a-link', Link);
