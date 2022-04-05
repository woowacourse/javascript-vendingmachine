import Component from 'Components/Abstract';
import { convertStringToElement } from 'Utils';
import template from './template.html';

export default class Header extends Component {
  template() {
    return convertStringToElement(template);
  }
}
