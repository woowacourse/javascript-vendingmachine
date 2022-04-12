import { CustomElement } from '../ui/CustomElement';
import { ELEMENT_KEY } from '../constants';

export type Dispatch = {
  key: string;
  action: string;
};

export type Observer = {
  key: ELEMENT_KEY;
  element: CustomElement;
};
