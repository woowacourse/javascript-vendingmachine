import { $ } from '../utils/dom.js';
import { emit } from '../utils/event.js';
import { CATEGORY_TEMPLATE } from '../templates/templates.js';
import { SECTION_CONTAINER } from '../constants/constants.js';

const routes = {
  '#!manage': CATEGORY_TEMPLATE.MANAGE,
  '#!charge': CATEGORY_TEMPLATE.CHARGE,
  '#!purchase': CATEGORY_TEMPLATE.PURCHASE,
};

const manageMenu = $('#manage-menu');
const chargeMenu = $('#charge-menu');
const purchaseMenu = $('#purchase-menu');

const render = () => {
  const { hash } = window.location;
  selectTab(hash);
  SECTION_CONTAINER.replaceChildren();
  SECTION_CONTAINER.insertAdjacentHTML('beforeend', routes[hash] ?? '');
  emit(SECTION_CONTAINER, '@render', { hash });
};

const selectTab = (hash) => {
  manageMenu.classList.toggle('select', hash === '#!manage');
  chargeMenu.classList.toggle('select', hash === '#!charge');
  purchaseMenu.classList.toggle('select', hash === '#!purchase');
};

window.addEventListener('hashchange', render);

window.addEventListener('DOMContentLoaded', render);
