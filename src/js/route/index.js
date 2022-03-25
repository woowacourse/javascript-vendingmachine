import { $ } from '../utils/dom.js';
import { emit } from '../utils/event.js';
import { CATEGORY_TEMPLATE } from '../template.js';

const routes = {
  '#!manage': CATEGORY_TEMPLATE.MANAGE,
  '#!charge': CATEGORY_TEMPLATE.CHARGE,
  '#!purchase': CATEGORY_TEMPLATE.PURCHASE,
};

const manageMenu = $('#manage-menu');
const chargeMenu = $('#charge-menu');
const purchaseMenu = $('#purchase-menu');
const sectionContainer = $('#section-container');

const render = () => {
  const { hash } = window.location;
  selectTab(hash);
  sectionContainer.replaceChildren();
  sectionContainer.insertAdjacentHTML('beforeend', routes[hash] ?? '');
  if (hash === '#!manage') {
    emit(sectionContainer, '@select');
    emit(sectionContainer, '@init');
  }
};

const selectTab = (hash) => {
  manageMenu.classList.toggle('select', hash === '#!manage');
  chargeMenu.classList.toggle('select', hash === '#!charge');
  purchaseMenu.classList.toggle('select', hash === '#!purchase');
};

window.addEventListener('hashchange', render);

window.addEventListener('DOMContentLoaded', render);
