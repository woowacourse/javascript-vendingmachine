import Component from 'Components/Abstract';
import UserSessionStore from 'Store/UserSessionStore';
import {
  $,
  addMultipleEventDelegate,
  convertStringToElement,
  createTemplate,
  getEntryPath,
  routingEvent,
} from 'Utils';
import templateLoginUserSection from './template/loginUserSection.html';
import templateGuestUserSection from './template/guestUserSection.html';
import './styles.scss';

export default class UserInfoForm extends Component {
  template() {
    if (UserSessionStore.isLogin()) {
      return createTemplate(templateLoginUserSection, {
        childTextContent: {
          '#user-info-profile': UserSessionStore.getState().userSession.name.slice(0, 1),
        },
      });
    }

    return convertStringToElement(templateGuestUserSection);
  }

  setEvents() {
    addMultipleEventDelegate(this.$component, 'click', {
      '#user-info-profile': { handler: this.handleOpenProfileMenu },
      '#user-info-logout': { handler: this.handleTryLogout },
    });
  }

  handleOpenProfileMenu = () => {
    $('.user-info-menu', this.$component).classList.toggle('menu-open');
  };

  handleTryLogout = () => {
    if (!confirm('정말 로그아웃 하시겠습니까?')) return;

    UserSessionStore.logout();
    routingEvent(getEntryPath());
  };
}
