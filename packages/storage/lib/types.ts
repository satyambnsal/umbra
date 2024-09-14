import type { StorageEnum } from './enums';

export type ValueOrUpdate<D> = D | ((prev: D) => Promise<D> | D);

export type BaseStorage<D> = {
  get: () => Promise<D>;
  set: (value: ValueOrUpdate<D>) => Promise<void>;
  getSnapshot: () => D | null;
  subscribe: (listener: () => void) => () => void;
};

export type Theme = 'light' | 'dark';

export type ThemeStorage = BaseStorage<Theme> & {
  toggle: () => Promise<void>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AztecAccount = {
  address: string;
  secretKey: string;
  salt: string;
  alias: string;
  type: string;
};
export type TokenContract = {
  name: string;
  symbol: string;
  contractAddress: string;
  deployerAddress: string;
};

export type Wallet = {
  rpcUrl: string;
  accounts: AztecAccount[];
  tokenContracts: TokenContract[];
};

export type WalletStorage = BaseStorage<Wallet> & {
  setRpcURL: (newUrl: string) => Promise<void>;
  addAccount: (newAccount: AztecAccount) => Promise<void>;
  addTokenContract: (tokenContract: TokenContract) => Promise<void>;
};

export type StorageConfig<D = string> = {
  /**
   * Assign the {@link StorageEnum} to use.
   * @default Local
   */
  storageEnum?: StorageEnum;
  /**
   * Only for {@link StorageEnum.Session}: Grant Content scripts access to storage area?
   * @default false
   */
  sessionAccessForContentScripts?: boolean;
  /**
   * Keeps state live in sync between all instances of the extension. Like between popup, side panel and content scripts.
   * To allow chrome background scripts to stay in sync as well, use {@link StorageEnum.Session} storage area with
   * {@link StorageConfig.sessionAccessForContentScripts} potentially also set to true.
   * @see https://stackoverflow.com/a/75637138/2763239
   * @default false
   */
  liveUpdate?: boolean;
  /**
   * An optional props for converting values from storage and into it.
   * @default undefined
   */
  serialization?: {
    /**
     * convert non-native values to string to be saved in storage
     */
    serialize: (value: D) => string;
    /**
     * convert string value from storage to non-native values
     */
    deserialize: (text: string) => D;
  };
};
