import Component from '../../core/Component';

class NotFound extends Component {
  template() {
    return `
      <div>
        <p>😱 Not Found</p>
      </div>
    `;
  }
}

customElements.define('not-found', NotFound);
