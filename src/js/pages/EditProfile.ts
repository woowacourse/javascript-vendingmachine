// import routes from '../router/routes';
import template from '../template';

export default class EditProfile {
  $headerTitle: HTMLElement;
  $contentsContainer: HTMLElement;
  $editProfileForm: HTMLFormElement;
  $editProfileEmail: HTMLInputElement;
  $editProfileName: HTMLFormElement;
  $editProfilePassword: HTMLInputElement;
  $editProfilePasswordCheck: HTMLInputElement;

  constructor() {
    this.$headerTitle = document.querySelector('#header-title');
    this.$contentsContainer = document.querySelector('.contents-container');
  }

  render() {
    this.$contentsContainer.insertAdjacentHTML('beforeend', template.editProfileContainer());
    this.$headerTitle.textContent = '회원 정보 수정';

    this.$editProfileForm = this.$contentsContainer.querySelector('#edit-profile-form');
    this.$editProfileEmail = this.$contentsContainer.querySelector('#edit-profile-email');
    this.$editProfileName = this.$contentsContainer.querySelector('#edit-profile-name');
    this.$editProfilePassword = this.$contentsContainer.querySelector('#edit-profile-password');
    this.$editProfilePasswordCheck = this.$contentsContainer.querySelector('#edit-profile-password-check');

    this.$editProfileForm.addEventListener('submit', this.onSubmitLogin);
  }

  onSubmitLogin = async (e: SubmitEvent) => {
    e.preventDefault();

    const data = JSON.stringify({
      email: this.$editProfileEmail.value,
      name: this.$editProfileName.value,
      password: this.$editProfilePassword.value,
    });

    console.log(data);

    const id = localStorage.getItem('id');

    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: data,
      });

      console.log(response);

      if (!response.ok) {
        throw new Error('잘못 입력 했습니다.');
      }

      //   const { pathname } = window.location;
      //   history.pushState({}, '상품 관리하기', pathname + '#!/product-manage');
      //   routes();
    } catch (e) {
      alert(e);
    }
  };
}
