declare module '*.html' {
  const content: string;
  export default content;
}

interface ClassConstructor<T> {
  new (...args): T;
}

interface ITemplateSetting {
  elementProperty?: Record<string, string | number | object | []>;
  childTextContent?: Record<string, string | number>;
}

type TStoreState = Record<string, any>;
type TRenderContent = {
  state: TStoreState;
  changedStateNames: Array<string>;
};
type TRenderMethod = (renderContent: TRenderContent) => void;
interface IProduct {
  name: string;
  price: number;
  quantity: number;
}

interface IProductStoreState {
  products: IProduct[];
}

interface IHoldingAmountStoreState {
  coins: number[];
}

interface ICoinListComponentProps {
  drawAmountList: IHoldingAmountStoreState['coins'];
}

interface IAmountInputProps {
  totalAmountText: string;
  onSubmit(event: EventListenerObject);
}
