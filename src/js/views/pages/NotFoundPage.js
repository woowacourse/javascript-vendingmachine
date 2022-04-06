import Component from '../../core/Component';

class NotFound extends Component {
  template() {
    return `
      <div>
        <p>😱 Not Found 😱 <br/><br/> url을 확인해주세요</p>
      </div>
    `;
  }
}

customElements.define('not-found', NotFound);
