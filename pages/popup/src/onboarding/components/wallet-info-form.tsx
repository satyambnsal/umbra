import { WizardLayout } from '../../components/wizard-layout.js';
import { Loader2Icon } from 'lucide-react';

interface WalletInfoFormProps {
  title: string;
  onSubmit: () => void;
  isProgress: boolean;
}

export const WalletInfoForm = ({ title, onSubmit, isProgress }: WalletInfoFormProps) => {
  return (
    <WizardLayout
      title={title}
      backButtonPath={-1}
      footer={
        <>
          <button
            type="button"
            className="btn btn-primary max-w-48 w-full"
            onClick={() => {
              onSubmit();
            }}
            data-testid="formSubmit"
            disabled={isProgress}>
            <span>Next</span>

            {isProgress ? <Loader2Icon className="animate-spin" size={16} /> : ''}
          </button>
        </>
      }>
      <div className="flex flex-col flex-1 gap-4">
        <div className="flex flex-col">
          <label htmlFor="walletNameInput" className="label">
            Account name
          </label>
          <input
            id="walletNameInput"
            placeholder="Set account name"
            data-testid="onboarding/walletNameInput"
            className="input"
            autoComplete="off"
          />
        </div>
      </div>
    </WizardLayout>
  );
};
