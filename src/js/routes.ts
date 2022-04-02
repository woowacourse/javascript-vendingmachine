import ChangeAdd from './pages/ChangeAdd';
import Login from './pages/Login';
import ProductManage from './pages/ProductManage';
import ProductPurchase from './pages/ProductPurchase';

const clearPurchaseBody = () => {
  const $inputSection = document.querySelector('.input-section');
  const $contentsContainer = document.querySelector('.contents-container');

  $inputSection.replaceChildren();
  $contentsContainer.replaceChildren();
};

const isLogged = () => {
  return localStorage.getItem('id');
};

const activeLogin = () => {
  const accountNavContainer = document.querySelector('#account-nav-container');
  const headerNav = document.querySelector('#header-nav');

  if (isLogged()) {
    accountNavContainer.classList.add('hide');
    headerNav.classList.remove('hide');
    return;
  }

  accountNavContainer.classList.remove('hide');
  headerNav.classList.add('hide');
};

const router = () => {
  const productManage = new ProductManage();
  const changeAdd = new ChangeAdd();
  const productPurchase = new ProductPurchase();
  const login = new Login();
  let prevPath = '';

  return () => {
    const { hash } = window.location;
    const isSamePage = prevPath === hash;

    activeLogin();

    if (isSamePage) return;

    prevPath = hash;
    clearPurchaseBody();

    switch (hash) {
      case '#!/product-manage':
        productManage.render();
        break;
      case '#!/change-add':
        changeAdd.render();
        break;
      case '#!/product-purchase':
        productPurchase.render();
        break;
      case '#!/login':
        login.render();
    }
  };
};

const routes = router();

export default routes;
