import { $ } from './dom';

export const loginnedMode = function () {
  $('.login-button').classList.add('loginned');
  $('.edit-profile-button').classList.add('loginned');
  $('.tab').classList.add('loginned');
  const { name } = JSON.parse(localStorage.getItem('accessToken'));
  $('#name-thumbnail').textContent = name[0];

  $('.edit-profile-button').value = 'name-thumbnail';

  location.href = `${window.location.pathname}#manage`;
};

export const logOutedMode = function () {
  $('.login-button').classList.remove('loginned');
  $('.edit-profile-button').classList.remove('loginned');
  $('.tab').classList.remove('loginned');
  location.href = `${window.location.pathname}#buy`;
};
