import { $, emit, on } from '../../dom/domHelper';

export default class SignInComponent {
  private $signUpButton = $<HTMLAnchorElement>(
    '.sign-in-section__sign-up-button'
  );

  constructor() {
    on(this.$signUpButton, 'click', this.onClickSignUpButton);
  }

  private onClickSignUpButton = (event: Event): void => {
    event.preventDefault();
    window.history.pushState({}, '', '/sign-up');
    emit(this.$signUpButton, '@signUpChangeComponent');
  };
}
