import { emit } from '../utils/event';
import { SECTION_CONTAINER } from '../constants/constants';

const render = () => {
  const { hash } = window.location;
  emit(SECTION_CONTAINER, '@render', { hash });
};

window.addEventListener('hashchange', render);

window.addEventListener('DOMContentLoaded', render);
