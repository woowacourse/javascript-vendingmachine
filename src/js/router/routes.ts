import ChangeAdd from '../pages/ChangeAdd';
import EditProfile from '../pages/EditProfile';
import Login from '../pages/Login';
import ProductManage from '../pages/ProductManage';
import ProductPurchase from '../pages/ProductPurchase';
import Signup from '../pages/Signup';

const useRoutes = () => {
  const productManage = new ProductManage();
  const changeAdd = new ChangeAdd();
  const productPurchase = new ProductPurchase();
  const login = new Login();
  const signup = new Signup();
  const editProfile = new EditProfile();

  return {
    '#!/product-manage': {
      path: '#!/product-manage',
      title: '상품 관리하기',
      page: productManage,
    },
    '#!/change-add': {
      path: '#!/change-add',
      title: '잔돈 채우기',
      page: changeAdd,
    },
    '#!/product-purchase': {
      path: '#!/product-purchase',
      title: '상품 구매',
      page: productPurchase,
    },
    '#!/login': {
      path: '#!/login',
      title: '로그인',
      page: login,
    },
    '#!/signup': {
      path: '#!/signup',
      title: '회원 가입',
      page: signup,
    },
    '#!/edit-profile': {
      path: '#!/edit-profile',
      title: '회원 정보 수정',
      page: editProfile,
    },
  };
};

const routes = useRoutes();

export default routes;
