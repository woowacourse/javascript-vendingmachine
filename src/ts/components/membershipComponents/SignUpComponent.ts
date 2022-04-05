import { $, on } from '../../dom/domHelper';

export default class SignUpComponent {
  private $signUpButton = $<HTMLAnchorElement>(
    '.sign-in-section__sign-up-button'
  );
  private $signInSection = $<HTMLElement>('.sign-in-section');
  private $signUpSection = $<HTMLElement>('.sign-up-section');

  constructor() {
    on(this.$signUpButton, '@signUp', this.renderSignUpComponent);
  }

  renderSignUpComponent = () => {
    // this.$signInSection.classList.add('hide');
    // this.$signUpSection.classList.remove('hide');
  };
}
