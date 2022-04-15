import { DEFAULT_PAGE } from 'Constants';
import { $, convertStringToElement, getEntryPath } from 'Utils';
import Component from 'Components/Abstract';
import template from './template.html';
import './styles.scss';

export default class Navigation extends Component {
  template() {
    const $template = convertStringToElement(template);

    const pagePath = getEntryPath() || DEFAULT_PAGE;
    const $focusNavMenu = $(`.nav-menu[data-route*="${pagePath}"]`, $template);
    $focusNavMenu && $focusNavMenu.classList.add('selected');

    return $template;
  }
}
