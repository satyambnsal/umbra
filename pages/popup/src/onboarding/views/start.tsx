import React from 'react';
import Logo from '../../common/assets/logo.svg?react';
import Plus from '../../common/assets/plus.svg?react';
import clsx from 'clsx';
import { WizardLayout } from '../../components/wizard-layout.js';
import { KeySquareIcon } from 'lucide-react';

type OptionCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
  testId: string;
};

export const OptionCard = ({ title, description, icon, disabled, onClick, testId }: OptionCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'card card-compact card-side items-center px-4 py-6 gap-4 cursor-pointer border-2 border-secondary',
        disabled ? 'bg-neutral' : 'bg-secondary',
      )}
      data-testid={testId}>
      <div className="btn btn-circle bg-neutral">{icon}</div>
      <div className="flex flex-col items-start">
        {disabled && <p className="text-sm text-mint">Coming soon!</p>}
        <p>{title}</p>
        <p className="text-sm">{description}</p>
      </div>
    </button>
  );
};

type StartViewProps = {
  onCreateClicked: () => void;
  onRestoreClicked: () => void;
};

export const StartView = ({ onCreateClicked, onRestoreClicked }: StartViewProps) => (
  <WizardLayout headerShown={false}>
    <div className="flex flex-1 flex-col items-center justify-center gap-8 p-4 text-center">
      <div className="flex flex-col justify-center items-center gap-6">
        <Logo width={84} height={84} />
        <p className="text-mint">Your gateway to the Aztec World.</p>
      </div>
      <div className="flex w-full flex-col gap-2">
        <OptionCard
          title="Create a new wallet"
          description="Get a fresh address"
          icon={<Plus />}
          onClick={onCreateClicked}
          testId="onboarding/createWalletButton"
        />

        <OptionCard
          title="Restore account"
          description="Import from private key"
          icon={<KeySquareIcon />}
          onClick={onRestoreClicked}
          testId="accounts/import"
        />
      </div>
    </div>
  </WizardLayout>
);
