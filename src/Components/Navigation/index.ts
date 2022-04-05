import { convertStringToElement } from 'Utils';
import Component from 'Components/Abstract';
import template from './template.html';
import './styles.scss';

export default class Navigation extends Component {
  template() {
    return convertStringToElement(template);
  }
}
