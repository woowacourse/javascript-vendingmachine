declare module '*.html' {
  const content: string;
  export default content;
}

interface TemplateSetting {
  elementProperty: Record<string, string | number | object | []>;
  childTextContent: Record<string, string | number>;
}

type StoreState = Record<string, any>;
type RenderContent = {
  state: StoreState;
  changedStateNames: Array<string>;
};
type RenderMethod = (renderContent: RenderContent) => void;
interface Product {
  name: string;
  price: number;
  quantity: number;
}

interface ProductStoreState {
  products: Product[];
}

interface HoldingAmountStoreState {
  coins: number[];
}
