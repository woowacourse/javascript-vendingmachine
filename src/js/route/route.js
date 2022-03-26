import { emit } from '../utils/event.js';
import { SECTION_CONTAINER } from '../constants/constants.js';

const render = () => {
  const { hash } = window.location;
  emit(SECTION_CONTAINER, '@render', { hash });
};

window.addEventListener('hashchange', render);

window.addEventListener('DOMContentLoaded', render);
