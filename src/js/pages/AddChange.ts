import AddChangeComponent from '../components/AddChangeComponent';
import ChangeListComponent from '../components/ChangeListComponent';

export default class ChangeAdd {
  AddChangeComponent: AddChangeComponent;
  ChangeListComponent: ChangeListComponent;
  $userMenu: HTMLElement;
  $sectionContainer: HTMLElement;
  $inputSection: HTMLElement;
  $contentsContainer: HTMLElement;
  $loginInputSection: HTMLElement;

  constructor() {
    this.$userMenu = document.querySelector('.user-menu');
    this.$sectionContainer = document.querySelector('.section-container');
    this.$inputSection = document.querySelector('.input-section');
    this.$contentsContainer = document.querySelector('.contents-container');
    this.$loginInputSection = document.querySelector('#login-input-container');
    this.AddChangeComponent = new AddChangeComponent(this.$inputSection, this.stateChange);
    this.ChangeListComponent = new ChangeListComponent(this.$contentsContainer);
  }

  render = () => {
    this.$userMenu.classList.remove('hide');
    this.$sectionContainer.classList.remove('hide');
    this.$loginInputSection.classList.add('hide');

    this.AddChangeComponent.render();
    this.ChangeListComponent.render();
    this.AddChangeComponent.refreshChange();
    this.ChangeListComponent.refreshChange();
  };

  private stateChange = () => {
    this.ChangeListComponent.refreshChange();
    this.AddChangeComponent.refreshChange();
  };
}
