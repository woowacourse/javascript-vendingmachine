import { $, on, emit } from '../../dom/domHelper';

export default class ConsumerSignInButtonComponent {
  private $signInButton = $<HTMLButtonElement>('.sign-in-button');
  private $signInSection = $<HTMLElement>('.sign-in-section');

  constructor() {
    on(this.$signInButton, 'click', this.onClickSignInButton);
  }

  private onClickSignInButton = () => {
    window.history.pushState({}, '', this.$signInSection.dataset.pathname);
    emit(this.$signInButton, '@signInChangeComponent');
  };
}
