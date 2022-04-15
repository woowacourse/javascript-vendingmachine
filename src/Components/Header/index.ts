import Component from 'Components/Abstract';
import { createTemplate } from 'Utils';
import template from './template.html';
import './styles.scss';

export default class Header extends Component {
  template() {
    return createTemplate(template, {
      childTextContent: {
        '.title': this.props.title || '🍿 자판기 🍿',
      },
    });
  }
}
