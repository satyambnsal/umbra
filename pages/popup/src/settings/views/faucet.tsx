import type { TokenContract } from '@extension/storage/lib/types.js';
import { currentWalletAtom, tokenContractsAtom } from '@src/atoms.js';
import { SettingsPageLayout } from '@src/components/settings-page-layout.js';
import { useAccount } from '@src/hooks/useAccount.js';
import clsx from 'clsx';
import { useAtomValue } from 'jotai';
import { Loader2Icon } from 'lucide-react';
import { useState } from 'react';
import { SelectTokenDropdown } from '../components/select-token-dropdown.js';
import { TokenContract as TokenContractAztec } from '@aztec/noir-contracts.js';
import { AztecAddress, Fr } from '@aztec/circuits.js';
import { computeSecretHash, ExtendedNote, Note } from '@aztec/aztec.js';
import { toast } from 'sonner';

type keysViewProps = {
  onCloseClicked: () => void;
};

export const FaucetView = ({ onCloseClicked }: keysViewProps) => {
  const { deployToken } = useAccount();
  const currentWallet = useAtomValue(currentWalletAtom);
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const tokenContracts = useAtomValue(tokenContractsAtom);
  const [selectedTokenContract, setSelectedTokenContract] = useState(tokenContracts[0]);
  const [isDeployProgress, setIsDeployProgress] = useState(false);
  const [isMintPublicProgress, setIsMintPublicProgress] = useState(false);
  const [isMintPrivateProgress, setIsMintPrivateProgress] = useState(false);

  const currenWalletContracts = tokenContracts.filter(
    ({ deployerAddress }) => currentWallet?.account.getAddress().toString() === deployerAddress,
  );

  const handleDeployToken = async ({ tokenName, tokenSymbol }: { tokenName: string; tokenSymbol: string }) => {
    if (!currentWallet) {
      console.error('Current Wallet not found!');
      return;
    }
    setIsDeployProgress(true);
    console.log('Deploying token');
    const tokenContact = await deployToken(currentWallet.account, tokenName, tokenSymbol);
    console.log('Token Contract deployed for address', tokenContact?.contractAddress);
    if (!selectedTokenContract && tokenContact) {
      setSelectedTokenContract(tokenContact);
    }
    setIsDeployProgress(false);
  };

  const selectToken = (token: TokenContract) => {
    setSelectedTokenContract(token);
  };

  const handleMintPrivate = async () => {
    if (!currentWallet) {
      //TODO: No acocount selected
      console.log('No account selected');
      return;
    }
    setIsMintPrivateProgress(true);
    const contracInstance = await TokenContractAztec.at(
      AztecAddress.fromString(selectedTokenContract.contractAddress),
      currentWallet.account,
    );

    const random = Fr.random();
    const secretHash = await computeSecretHash(random);

    const tx = await contracInstance.methods.mint_private(100n, secretHash).send();
    console.log(`Sent mint transaction ${await tx.getTxHash()}`);
    console.log('Awaiting transaction to be mined');
    const receipt = await tx.wait();
    // console.log(
    //   chalk.green(`Transaction has been mined on block ${chalk.bold(receipt.blockNumber)}`)
    // )
    const note = new Note([new Fr(100n), secretHash]);
    const extendedNote = new ExtendedNote(
      note,
      currentWallet.account.getAddress(),
      contracInstance.address,
      TokenContractAztec.storage.pending_shields.slot,
      TokenContractAztec.notes.TransparentNote.id,
      receipt.txHash,
    );
    await currentWallet.account.addNote(extendedNote);

    console.log(`Redeeming created note for second wallet: ${currentWallet.account.getAddress()} \n`);

    const tx1 = await contracInstance.methods.redeem_shield(currentWallet.account.getAddress(), 100n, random).send();
    console.log(`Sent mint transaction ${await tx.getTxHash()}`);
    console.log('Awaiting transaction to be mined');
    const receipt1 = await tx1.wait();
    console.log(`Transaction has been mined on block ${receipt1.blockNumber}`);
    setIsMintPrivateProgress(false);
    toast.success('100 private token minted successfully');
  };

  const handleMintPublic = async () => {
    if (!currentWallet) {
      //TODO: No acocount selected
      console.log('No account selected');
      return;
    }
    setIsMintPublicProgress(true);
    const contracInstance = await TokenContractAztec.at(
      AztecAddress.fromString(selectedTokenContract.contractAddress),
      currentWallet.account,
    );

    const tx = await contracInstance.methods.mint_public(currentWallet.account.getAddress(), 100n).send();

    console.log(`Sent mint transaction ${await tx.getTxHash()}`);
    console.log('Awaiting transaction to be mined');
    const receipt = await tx.wait();
    console.log(`Transaction has been mined on block ${receipt.blockNumber}`);
    setIsMintPublicProgress(false);
    toast.success('100 public token minted successfully');
  };

  const isTokenAvailable = currenWalletContracts.length > 0 && selectedTokenContract;
  return (
    <div className="flex flex-col flex-1 bg-[#1a2b3c] h-full" data-testid="appLayout">
      <SettingsPageLayout title="Faucet" onCloseClicked={onCloseClicked}>
        <div className="flex flex-col gap-3">
          <form className="flex flex-col items-center w-full">
            <div className="w-full space-y-2 mb-4">
              <div className="space-y-0.5">
                <input
                  type="text"
                  className={clsx('w-full input', false && 'input-bordered input-error')}
                  placeholder="token name"
                  data-testid="newAddress/nameInput"
                  onChange={e => {
                    setTokenName(e.target.value);
                  }}
                  // {...register('name')}
                />
                {/* {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>} */}
              </div>
              <div className="space-y-0.5">
                <input
                  type="text"
                  className={clsx('w-full input', false && 'input-bordered input-error')}
                  placeholder="token symbol(ETH)"
                  data-testid="newAddress/addressInput"
                  onChange={e => {
                    setTokenSymbol(e.target.value);
                  }}
                  // {...register('address')}
                />
                {/* {errors.add+ress && <p className="text-xs text-red-400">{errors.address.message}</p>} */}
              </div>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleDeployToken({ tokenName, tokenSymbol })}
              disabled={tokenName.length === 0 || tokenSymbol.length === 0 || isDeployProgress}>
              Deploy token
              {isDeployProgress && <Loader2Icon className="animate-spin" size={16} />}
            </button>
          </form>

          <div className="flex items-center gap-3">
            {isTokenAvailable ? (
              <>
                <p>Select Token</p>

                <SelectTokenDropdown
                  tokenContracts={currenWalletContracts}
                  selectedToken={selectedTokenContract}
                  selectToken={selectToken}
                />
              </>
            ) : (
              <p>No Token contracts available</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <button
              className="btn btn-primary w-full"
              onClick={handleMintPublic}
              disabled={!isTokenAvailable || isMintPublicProgress}>
              Mint 100 public token
              {isMintPublicProgress && <Loader2Icon className="animate-spin" size={16} />}
            </button>

            <button
              className="btn btn-primary w-full"
              onClick={handleMintPrivate}
              disabled={!isTokenAvailable || isMintPrivateProgress}>
              Mint 100 private token
              {isMintPrivateProgress && <Loader2Icon className="animate-spin" size={16} />}
            </button>
          </div>
        </div>
      </SettingsPageLayout>
    </div>
  );
};
