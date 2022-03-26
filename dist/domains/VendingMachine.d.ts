export interface Item {
    name: string;
    price: number;
    quantity: number;
}
export interface Coins {
    10: number;
    50: number;
    100: number;
    500: number;
}
export interface VendingMachineState {
    items: Item[];
    coins: Coins;
}
export default class VendingMachine {
    state: VendingMachineState;
    constructor(initItems: Item[], initCoins: Coins);
    init(initItems: Item[], initCoins: Coins): void;
    useStore(callback: Function): any;
    addItem(item: Item): void;
    updateItem(name: string, updatedItem: Item): void;
    removeItem(name: string): void;
    findItem(name: string): Item | null;
    addCoin(amount: number): void;
    getTotalMoney(): number;
}
export declare const vendingMachine: VendingMachine;
