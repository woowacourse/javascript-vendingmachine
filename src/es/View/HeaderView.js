import { $ } from '../utils';

export default class HeaderView {
  $container = $('header');

  render(state) {
    this.drawNavigationMenu(state);
  }

  drawNavigationMenu({ currentPage }) {
    // $('.nav .selected').classList.remove('selected');

    // const selectedMenu = $(`.nav-menu[data-route*="${currentPage}"]`);
    // selectedMenu.classList.add('selected');
  }
}
