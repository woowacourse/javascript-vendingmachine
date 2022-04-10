import Component from '../abstract/component';
import { WhiteList } from '../constants';
import { customElement } from '../decorators/decortators';
import Router from '../router';

@customElement('logged-in-btn')
class LoggedInBtn extends Component {
  private userName: string;

  constructor() {
    super();
    this.userName = this.dataset.userName as string;
  }

  template(userName: string): string {
    return `
      <button class="btn circle btn-dropdown">${userName[0]}</button>
      <div class="dropdown-container">
        <ul class="dropdown hide disappear">
          <li><a href="${WhiteList.MyAccountPage}">회원 정보 수정</a></li>
          <li class="logout">로그아웃</li>
        </ul>
      </div>
    `;
  }

  setEvent() {
    this.addEvent('click', '.btn-dropdown', this.dropdown);
    this.addEvent('click', '.logout', this.logout);
    this.addEvent('click', 'a', (e: Event) => {
      e.preventDefault();
      const $anchor = e.target as HTMLAnchorElement;
      Router.pushState($anchor.href);
    });
  }

  dropdown = () => {
    const $dropdown = this.querySelector('.dropdown');
    if (!$dropdown) return;
    $dropdown.classList.toggle('hide');
  };

  logout = () => {
    localStorage.clear();
    location.href = `${location.origin}`;
  };

  mount() {
    this.render();
  }

  render() {
    this.innerHTML = this.template(this.userName);
  }
}

export default LoggedInBtn;
