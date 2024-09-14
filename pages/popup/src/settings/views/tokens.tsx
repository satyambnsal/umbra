import { currentTokenContractAtom, tokenContractsAtom } from '@src/atoms.js';
import { SettingsPageLayout } from '@src/components/settings-page-layout.js';
import { useAtom, useAtomValue } from 'jotai';

type AboutViewProps = {
  onCloseClicked: () => void;
};

export const TokensView = ({ onCloseClicked }: AboutViewProps) => {
  const [currentTokenContract, setCurrentTokenContract] = useAtom(currentTokenContractAtom);
  const tokenContracts = useAtomValue(tokenContractsAtom);

  return (
    <div className="flex flex-col flex-1 bg-[#1a2b3c]" data-testid="appLayout">
      <SettingsPageLayout title="Tokens" onCloseClicked={onCloseClicked}>
        <div className="flex flex-col gap-3">
          {tokenContracts &&
            tokenContracts.map(token => {
              const isCurrentToken = token.contractAddress === currentTokenContract?.contractAddress;
              return (
                <button
                  className={`card p-3 text-left flex gap-2 w-full ${isCurrentToken ? 'bg-primary text-secondary' : 'bg-secondary text-white'}`}
                  type="button"
                  onClick={() => {
                    setCurrentTokenContract(token);
                  }}>
                  <span className="font-semibold">{token?.symbol}</span>
                  <span>{token?.name}</span>
                </button>
              );
            })}
        </div>
      </SettingsPageLayout>
    </div>
  );
};
