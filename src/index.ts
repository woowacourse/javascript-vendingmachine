import { VENDING_MACHINE_ROUTE_NAME } from './utils/constants';
import '../images/empty-img.png';
import '../src/styles/index.css';
import './components/VendingMachineComponent';
import AppComponent from './components';
import router from './router';
const appComponent = new AppComponent(router.getRouteName(window.location.pathname));
window.addEventListener('popstate', e => {
  const { state } = e;

  appComponent.showSection(state?.path ?? VENDING_MACHINE_ROUTE_NAME.MANAGE);
});
