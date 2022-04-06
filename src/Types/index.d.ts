declare module '*.html' {
  const content: string;
  export default content;
}

interface ClassConstructor<T> {
  new (...args): T;
}

type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
};

/*
  Store 영역 타입
*/
interface IProduct {
  name: string;
  price: number;
  quantity: number;
}

interface IStoreUniqueState {
  products?: IProduct[];
  holdingCoins?: number[];
  chargedCoins?: number[];
}

type TRenderContent = {
  state: IStoreUniqueState;
  changedStateNames: Array<string>;
};

type TRenderMethod = (renderContent: TRenderContent) => void;
type TRenderDrawMethod = (state: any) => void;
type TRenderMethodList = PartialRecord<keyof IStoreUniqueState, TRenderDrawMethod[]>;

/*
  컴포넌트 영역 타입
*/
interface ITemplateSetting {
  elementProperty?: Record<string, string | number | object | []>;
  childTextContent?: Record<string, string | number>;
}

interface ICoinListComponentProps {
  drawAmountList: IStoreUniqueState['holdingCoins'];
}

interface IProductListProps {
  caption: string;
  listType: 'manage' | 'purchase';
  onProductUpdate?(productIndex: number, product: IProduct);
  onRemoveProduct?(productIndex: number);
}

interface IAmountInputProps {
  formLabel: string;
  totalAmountText: string;
  onAddAmount(inputAmount: number);
}

/*
  Util 영역 타입
*/

interface IEventDelegateListener {
  eventType: string;
  handler(event: Event);
  defaultEvent?: boolean;
}
