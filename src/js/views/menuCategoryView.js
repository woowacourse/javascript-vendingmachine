import { SECTION_CONTAINER } from '../constants/constants.js';
import { $, replaceElement } from '../utils/dom.js';
import { CATEGORY_TEMPLATE } from '../templates/templates.js';

const routes = {
  '#!manage': CATEGORY_TEMPLATE.MANAGE,
  '#!charge': CATEGORY_TEMPLATE.CHARGE,
  '#!purchase': CATEGORY_TEMPLATE.PURCHASE,
};

const manageMenu = $('#manage-menu');
const chargeMenu = $('#charge-menu');
const purchaseMenu = $('#purchase-menu');

const selectTab = (hash) => {
  manageMenu.classList.toggle('select', hash === '#!manage');
  chargeMenu.classList.toggle('select', hash === '#!charge');
  purchaseMenu.classList.toggle('select', hash === '#!purchase');
};

export const initHashContents = (hash) => {
  const content = routes[hash] ?? '';
  selectTab(hash);
  replaceElement(SECTION_CONTAINER, content);
};
