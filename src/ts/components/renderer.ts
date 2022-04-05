export const renderComponent = (tagName: string) => {
  document.body.appendChild(document.createElement(tagName));
};

export const renderUserPrivatePage = () => {
  console.log('renderUserPrivatePage');
  document.querySelector('.nav-tab').classList.remove('hide');
  document.querySelector('user-menu').setAttribute('auth', 'login');
};

export const renderPublicPage = () => {
  console.log('renderPublicPage');
  document.querySelector('.nav-tab').classList.add('hide');
  document.querySelector('user-menu').setAttribute('auth', 'logout');
};
