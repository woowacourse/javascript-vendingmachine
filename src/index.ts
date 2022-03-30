import '../images/empty-img.png';
import '../src/styles/index.css';
import '../src/components/index';
import VendingMachineComponent from '../src/components/index';

const currentSectionName = window.location.pathname.slice(1);
const vendingMachineComponent = new VendingMachineComponent(currentSectionName);
window.addEventListener('popstate', e => {
  const { state } = e;
  /** 라우터가 변하는 것에 뷰가 변하고 있는거겟죠..? */
  vendingMachineComponent.showSection(state?.path ?? '');
});
