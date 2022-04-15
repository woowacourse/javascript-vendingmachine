import { Page } from '../ui/CustomElement';
import { ELEMENT_ACTION, ELEMENT_KEY } from '../constants';
import Product from './Product';

export type Dispatch = {
  key: ELEMENT_KEY;
  action?: ELEMENT_ACTION;
  product?: Product;
  userName?: string;
};

export type Observer = {
  key: ELEMENT_KEY;
  element: Page;
};
