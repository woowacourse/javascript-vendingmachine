import './styles';
import { getSavedAuthInfo, requestUserInfo } from './es/utils/auth';
import { initRouteEvent, loadCurrentPage } from './es/routes';

const initialAuthInfo = getSavedAuthInfo();

if (initialAuthInfo.accessToken) {
  requestUserInfo(initialAuthInfo).then(() => loadCurrentPage());
} else {
  loadCurrentPage();
}

initRouteEvent();
