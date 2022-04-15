type IdType = `#${string}`;

type classType = `.${string}`;

type SelectorObjectType<T = string> = Record<string, T>;

export type SelectorType = {
  ID: SelectorObjectType<IdType>;
  CLASS: SelectorObjectType<classType>;
  ID_STRING: SelectorObjectType;
  CLASS_STRING: SelectorObjectType;
};

export type CoinsConstantType = {
  fiveHundred: 500;
  hundred: 100;
  fifty: 50;
  ten: 10;
};

export type CustomEventType =
  | 'ROUTE_CHANGE'
  | 'CHARGE_MONEY'
  | 'ADD_ITEM'
  | 'TABLE_ITEM_CHANGE'
  | 'TABLE_ITEM_DELETE'
  | 'PURCHASE_MONEY_INPUT'
  | 'RETURN_MONEY'
  | 'LOG_IN'
  | 'SIGN_UP'
  | 'CHANGE_USER_INFO'
  | 'PURCHASE_ITEM';

export type IsLogInType = 'isLogIn';
