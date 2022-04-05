import './css/index';
import router from './js/routes';

router.init();

window.addEventListener('popstate', function () {
  router.back();
});
