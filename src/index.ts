import '../images/empty-img.png';
import '../src/styles/index.css';
import '../src/components/index';
import VendingMachineComponent from '../src/components/index';

const hashRoute = window.location.hash.replace('#', '');
const vendingMachineComponent = new VendingMachineComponent(hashRoute);
window.addEventListener('hashchange', () => {
  const hash = window.location.hash.replace('#', '');
  vendingMachineComponent.showSectionByRoute(hash);
});
