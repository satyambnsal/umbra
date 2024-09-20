import type { OnMessageCallback } from 'webext-bridge';

export type Handler = OnMessageCallback<any, any>;

export const umbraRequestAccounts: Handler = async ({ data }) => {
  try {
    console.log('TODO: requesting wallets');
  } catch (error: unknown) {
    return { error: error };
  }
};
export const opts = {
  projectId: 'test',
  chains: ['Sandbox'],
};
