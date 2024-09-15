import { useStorage } from '@extension/shared';
import { walletStorage } from '@extension/storage';
import { rpcUrlAtom } from '@src/atoms.js';
import { useAtom } from 'jotai';

export const useRPC = () => {
  const walletData = useStorage(walletStorage);
  const [rpcUrl, setRpcURL] = useAtom(rpcUrlAtom);

  const setRpcUrlFn = async (rpcUrl: string) => {
    setRpcURL(rpcUrl);
    try {
      await walletStorage.setRpcURL(rpcUrl);
    } catch (e) {
      console.error(`Failed to set RPC url to storage`, e);
    }
  };

  const initRPCUrl = () => {
    if (rpcUrl !== walletData.rpcUrl) {
      setRpcURL(walletData.rpcUrl);
    }
  };

  return {
    setRpcUrlFn,
    initRPCUrl,
    rpcUrl,
  };
};
