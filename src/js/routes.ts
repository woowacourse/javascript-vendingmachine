import ChangeAdd from './pages/ChangeAdd';
import ProductManage from './pages/ProductManage';

const clearPurchaseBody = () => {
  const $inputSection = document.querySelector('.input-section');
  const $contentsContainer = document.querySelector('.contents-container');

  $inputSection.replaceChildren();
  $contentsContainer.replaceChildren();
};

const router = () => {
  const productManage = new ProductManage();
  const changeAdd = new ChangeAdd();
  let prevPath = '';

  return () => {
    const pathName = window.location.hash;

    if (prevPath === pathName) {
      return;
    }

    prevPath = pathName;
    clearPurchaseBody();

    switch (pathName) {
      case '#!/product-manage':
        productManage.render();
        break;
      case '#!/change-add':
        changeAdd.render();
        break;
      default:
        break;
    }
  };
};

const routes = router();

export default routes;
