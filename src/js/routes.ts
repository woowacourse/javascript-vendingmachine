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
    const { hash } = window.location;
    const isSamePage = prevPath === hash;

    if (isSamePage) return;

    prevPath = hash;
    clearPurchaseBody();

    switch (hash) {
      case '#!/product-manage':
        productManage.render();
        break;
      case '#!/change-add':
        changeAdd.render();
    }
  };
};

const routes = router();

export default routes;
