declare module '*.html' {
  const content: string;
  export default content;
}

type TComponent = import('Components/Abstract').default;

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

interface IUserSession {
  isLoggedIn: boolean;
  key: number;
  email: string;
  name: string;
  expire: number;
}

interface IUserSessionEvent {
  isDone: boolean;
  isError: boolean;
  message: string;
}

interface IStoreState {
  products?: IProduct[];
  holdingCoins?: number[];
  returnCoins?: number[];
  chargedAmount?: number;
  userSession?: IUserSession;
  userSessionEvent?: IUserSessionEvent;
}

type TRenderContent = {
  state: IStoreState;
  changedStateKeys: Array<string>;
};

type TRenderMethod = (renderContent: TRenderContent) => void;
type TRenderDrawMethod = (state: any) => void;
type TRenderMethodList = PartialRecord<keyof IStoreState, TRenderDrawMethod[]>;

/*
  컴포넌트 영역 타입
*/
interface ICoinListComponentProps {
  drawAmountList: IStoreState['holdingCoins'];
}

interface IProductListProps {
  caption: string;
  listType: 'manage' | 'purchase';
  handleProductUpdate?(productIndex: number, product: IProduct);
  handleRemoveProduct?(productIndex: number);
}

interface IAmountInputProps {
  formLabel: string;
  totalAmountText: string;
  onAddAmount(inputAmount: number): boolean;
}

interface IValidationInputProps {
  name: string;
  type: 'text' | 'password' | 'email';
  label: string;
  placeholder: string;
  value?: string;
  disabled?: boolean;
  isValidationCheck?(inputValue: string): boolean;
  isDisabled?: boolean;
  errorMessage?: string;
}

/*
  Util 영역 타입
*/
interface ITemplateSetting {
  elementProperty?: Record<string, boolean | string | number | object | []>;
  childTextContent?: Record<string, string | number>;
}

interface IEventDelegateListener {
  eventType: string;
  handler(event: Event);
  defaultEvent?: boolean;
}

/*
   API 영역 타입
*/
interface IRequest {
  status: 'success' | 'fail';
  content: any;
}
