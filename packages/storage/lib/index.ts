import { createStorage } from './base';
import { exampleThemeStorage } from './exampleThemeStorage';
import { SessionAccessLevelEnum, StorageEnum } from './enums';
import type { BaseStorage } from './types';
import { walletStorage } from './walletStorage';

export { exampleThemeStorage, createStorage, StorageEnum, SessionAccessLevelEnum, walletStorage };
export type { BaseStorage };
