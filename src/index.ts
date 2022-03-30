import '../images/empty-img.png';
import '../src/styles/index.css';
import '../src/components/index';
import VendingMachineComponent from '../src/components/index';

const currentSectionName = window.location.pathname.slice(1);
new VendingMachineComponent(currentSectionName);
