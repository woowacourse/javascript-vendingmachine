import './css/index.css';
import './ts/tabRouter.ts';
import View from './ts/view/View';
import VendingMachine from './ts/domain/VendingMachine';

const vendingMachine = new VendingMachine();
new View(vendingMachine);
