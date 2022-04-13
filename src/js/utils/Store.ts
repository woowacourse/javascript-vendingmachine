type DOMVariable = {
  name: string;
  selector: string;
};

export default class Store {
  private variable: DOMVariable[];

  constructor() {
    this.variable = [];
  }

  setVariable(array: Array<DOMVariable>): void {
    array.forEach(item => {
      this.variable.push({ name: item.name, selector: item.selector });
    });
  }

  get(name: string): HTMLElement {
    const targetItem = this.variable.find(item => item.name === name);
    return document.querySelector(targetItem.selector);
  }
}
