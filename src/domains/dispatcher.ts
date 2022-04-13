import { Action, Product, ModifyDetail } from '../abstracts/types';
import { createAction } from './actions';

import AuthStateStoreInstance from './stores/AuthStateStore';
import ProductStoreInstance from './stores/ProductStore';
import CoinStoreInstance from './stores/CoinStore';

const reducer = {
  ...AuthStateStoreInstance.reducer,
  ...ProductStoreInstance.reducer,
  ...CoinStoreInstance.reducer,
};

const dispatcher = (actionType: string, detail?: number | Product | ModifyDetail | string) => {
  const action: Action = createAction(actionType, detail);
  reducer[actionType](action);
};

export default dispatcher;
