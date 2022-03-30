import '../images/empty-img.png';
import '../src/styles/index.css';
import '../src/components/index';
import VendingMachineComponent from '../src/components/index';
import { TAB_NAME } from './utils/constants';

const vendingMachineComponent = new VendingMachineComponent();
window.addEventListener('popstate', e => {
  const { state } = e;
  vendingMachineComponent.showSection(state?.path ?? TAB_NAME.MANAGE);
});
