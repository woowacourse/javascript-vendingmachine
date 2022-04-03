import './styles';
import { getSavedUserInfo, requestUserInfo } from './es/utils/auth';
import { initRouteEvent, loadMainPage } from './es/routes';

const initialUserInfo = getSavedUserInfo();

if (initialUserInfo) {
  requestUserInfo(initialUserInfo).then(() => loadMainPage());
} else {
  loadMainPage();
}

initRouteEvent();
