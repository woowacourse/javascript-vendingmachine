import { TCoinWallet, TCoinWalletKey } from '../domains/types';
import { TStateKey } from '../stores/types';

export const COIN_VALUES: TCoinWallet = {
  coin_500: 500,
  coin_100: 100,
  coin_50: 50,
  coin_10: 10,
};

export const COIN_KEYS: Array<TCoinWalletKey> = ['coin_500', 'coin_100', 'coin_50', 'coin_10'];

export const VENDING_MACHINE_STATE_KEYS: {
  PRODUCT_LIST: TStateKey;
  COIN_WALLET: TStateKey;
  INPUT_CHARGE: TStateKey;
} = {
  PRODUCT_LIST: 'PRODUCT_LIST',
  COIN_WALLET: 'COIN_WALLET',
  INPUT_CHARGE: 'INPUT_CHARGE',
};
