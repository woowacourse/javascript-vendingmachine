import Component from '../abstract/component';
import { customElement } from '../decorators/decortators';

@customElement('side-toast')
class SideToast extends Component {
  private delay = 2200;

  private $container?: HTMLElement;

  template(): string {
    return `
      <ul></ul>
    `;
  }

  success(message: string) {
    if (!this.shouldToast(message)) return;
    const li = `<li class="toast success">${message}</li>`;
    this.$container!.insertAdjacentHTML('beforeend', li);
    this.popLater();
  }

  error(message: string) {
    if (!this.shouldToast(message)) return;
    const li = `<li class="toast error">${message}</li>`;
    this.$container!.insertAdjacentHTML('beforeend', li);
    this.popLater();
  }

  shouldToast(message: string) {
    if (!this.$container) return false;
    const length = this.$container.children.length;
    if (length === 0) return true;
    // 마지막 메세지와 동일하다면 추가로 toast를 보여주지 않는다
    if ((this.$container.children[length - 1] as HTMLElement).innerText === message) return false;
    return true;
  }

  popLater() {
    const messageCount = this.$container?.children.length ?? 0;
    setTimeout(() => {
      this.$container?.removeChild(this.$container?.children[0]);
    }, this.delay * messageCount);
  }

  shouldSubscribe() {
    return false;
  }

  mount() {
    this.render();
  }

  render() {
    this.innerHTML = this.template();
    this.$container = this.querySelector('ul') as HTMLElement;
  }
}

export default SideToast;
