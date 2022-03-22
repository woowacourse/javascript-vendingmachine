import ProductManage from './ProductManage';

const clearPurchaseBody = () => {
  const $inputSection = document.querySelector('.input-section');
  const $contentsContainer = document.querySelector('.contents-container');

  $inputSection.replaceChildren();
  $contentsContainer.replaceChildren();
};

const routesCoke = () => {
  const productManage = new ProductManage();
  let prevPath = '';

  return () => {
    const pathname = window.location.hash;

    if (prevPath === pathname) {
      return;
    }

    prevPath = pathname;
    clearPurchaseBody();

    switch (pathname) {
      case '#!/product-manage':
        productManage.render();
        break;
      case '/#!/change-add':
        break;
    }
  };
};

const routes = routesCoke();

export default routes;
