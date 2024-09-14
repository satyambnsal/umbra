import { AztecAddress } from '@aztec/circuits.js';
import { TokenContract as TokenContractAztec } from '@aztec/noir-contracts.js';
import { currentTokenContractAtom, currentWalletAtom, privateBalanceAtom, publicBalanceAtom } from '@src/atoms.js';
import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import { useInterval } from 'react-use';

const DELAY = 5000;

export const useBalance = () => {
  const currentWallet = useAtomValue(currentWalletAtom);
  const currentTokenContract = useAtomValue(currentTokenContractAtom);
  const [isFetch, setIsFetch] = useState(currentWallet !== null && currentTokenContract !== null);
  const setPublicBalance = useSetAtom(publicBalanceAtom);
  const setPrivateBalance = useSetAtom(privateBalanceAtom);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (currentWallet && currentTokenContract) {
      setIsFetch(true);
    } else {
      setIsFetch(false);
    }
  }, [currentWallet, currentTokenContract]);

  const fetchBalance = useCallback(async () => {
    console.log('fetch balance called');
    if (currentWallet && currentTokenContract) {
      setIsFetching(true);
      const tokenContract = await TokenContractAztec.at(
        AztecAddress.fromString(currentTokenContract?.contractAddress),
        currentWallet?.account,
      );
      const publicBalance = await tokenContract.methods
        .balance_of_public(currentWallet.account.getAddress())
        .simulate();
      const privateBalance = await tokenContract.methods
        .balance_of_private(currentWallet.account.getAddress())
        .simulate();
      setPublicBalance(publicBalance);
      setPrivateBalance(privateBalance);
      console.log({ publicBalance, privateBalance });
      setIsFetching(false);
    } else {
      console.warn('token contract or wallet not found', currentTokenContract, currentWallet);
    }
  }, [currentWallet, currentTokenContract]);

  useInterval(fetchBalance, isFetch ? DELAY : null);
  console.log('is Fetch', isFetch);

  return {
    fetchBalance,
    isFetching,
  };
};
