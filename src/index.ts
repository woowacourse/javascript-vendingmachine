import './css/index.css';

import ItemManageTab from './ts/ItemManageTab';
import VendingMachine from './ts/VendingMachine';

const vendingMachine = new VendingMachine();
const itemManagetab = new ItemManageTab(vendingMachine);
