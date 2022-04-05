import './styles';
import { getSavedAuthInfo, requestUserInfo } from './es/utils/auth';
import { initRouteEvent, loadMainPage } from './es/routes';

const initialAuthInfo = getSavedAuthInfo();

if (initialAuthInfo.accessToken) {
  requestUserInfo(initialAuthInfo).then(() => loadMainPage());
} else {
  loadMainPage();
}

initRouteEvent();
