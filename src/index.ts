import './css/index.css';
import View from './ts/view/View';
import VendingMachine from './ts/domain/VendingMachine';

const vendingMachine = new VendingMachine();
new View(vendingMachine);
