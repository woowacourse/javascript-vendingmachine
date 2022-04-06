import Subject from './Subject';
import { deepClone } from '../utils/commons';

interface State {
  [key: string]: any;
}

export default class Domain<T extends State> {
  state: T;

  constructor(initialState: T) {
    this.state = Subject.observable(initialState);
  }

  useStore(callback: (state: T) => Partial<T>): Partial<T> {
    return deepClone(callback(this.state) as Partial<T>);
  }
}
