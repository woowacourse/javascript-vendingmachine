import globalStore from '../../stores/globalStore';
import { GLOBAL_STATE_KEYS } from '../../utils/constants';

class LoadingComponent {
  constructor() {
    this.$app = document.querySelector('#app');
    this.mount();
    this.initDOM();
    this.subscribeStore();
    this.initRender();
  }

  mount() {
    this.$app.insertAdjacentHTML('beforeend', this.generateTemplate());
  }

  initDOM() {
    this.$loading = document.querySelector('#loading');
  }

  generateTemplate() {
    return `
        <div id="loading" class="flex-center-box">
        <svg width="50" height="50" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 30C24.8366 30 32 22.8028 32 13.9247C32 7.97458 28.7824 2.77949 24 0L21.3333 4.64172C24.5216 6.49471 26.6667 9.9581 26.6667 13.9249C26.6667 19.8436 21.891 24.6417 16 24.6417C10.109 24.6417 5.33333 19.8436 5.33333 13.9249C5.33333 12.6727 5.54708 11.4707 5.93991 10.3536L0.91043 8.56627C0.320823 10.2423 0 12.0459 0 13.9247C0 22.8028 7.16344 30 16 30Z" fill="#00BCD4"/>
        </svg>
        </div>
    `;
  }

  subscribeStore() {
    globalStore.subscribe(GLOBAL_STATE_KEYS.IS_LOADING, this);
  }

  initRender() {
    const isLoading = globalStore.getState(GLOBAL_STATE_KEYS.IS_LOADING);
    this.render(isLoading);
  }

  wakeUp(stateKey) {
    const state = globalStore.getState(stateKey);
    this.render(state);
  }

  render(isLoading) {
    if (isLoading) {
      this.$loading.classList.remove('hide');
      return;
    }
    this.$loading.classList.add('hide');
  }
}
export default LoadingComponent;
