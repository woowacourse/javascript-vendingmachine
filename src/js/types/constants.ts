type IdType = `#${string}`;

type classType = `.${string}`;

export type SelectorType = {
  ID: { [idName: string]: IdType };
  CLASS: { [className: string]: classType };
  ID_STRING: { [idStringName: string]: string };
  CLASS_STRING: { [classStringName: string]: string };
};

export type CoinsConstantType = {
  fiveHundred: 500;
  hundred: 100;
  fifty: 50;
  ten: 10;
};
