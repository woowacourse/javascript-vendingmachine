import { $, on } from '../dom/domHelper';

export default class DimmerComponent {
  private $dimmer = $<HTMLElement>('.dimmer');
  private $informationWrapper = $<HTMLUListElement>(
    '.membership-information-wrapper'
  );

  constructor() {
    on(this.$dimmer, 'click', this.onClickDimmer);
  }

  onClickDimmer = (): void => {
    this.$informationWrapper.classList.add('hide');
    this.$dimmer.classList.add('hide');
  };
}
