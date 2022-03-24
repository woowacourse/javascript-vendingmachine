export type Action = {
  type: string;
  payload: string | number | Record<string, unknown>;
};

export type AppState = {
  [key in string]: string | number | Record<string, unknown>;
};

export type ActionPayLoad = string | number | Record<string, unknown>;
