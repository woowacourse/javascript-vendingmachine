import './css/index.css';
import View from './ts/view/View';
import VendingMachine from './ts/domain/VendingMachine';
import UserManager from './ts/domain/UserManager';

const vendingMachine = new VendingMachine();
const manager = new UserManager();

new View(vendingMachine, manager);
