import { AppLayout } from '@src/components/app-layout.js';
import { MenuBar } from '@src/components/menu-bar.js';
import clsx from 'clsx';

type NewAddressViewProps = {
  onGoBack: () => void;
  onSubmit: (contact: { name: string; address: string }) => void;
};

export const NewAddressView = ({ onGoBack }: NewAddressViewProps) => {
  return (
    <AppLayout>
      <div className="pb-12 bg-secondary rounded-b-2xl">
        <MenuBar variant="back" onBackClicked={onGoBack} />
        <h2 className="ml-8 mt-1 text-3xl">New contact</h2>
      </div>
      <div className="pt-6 pb-8 px-8 flex flex-col flex-1">
        <div className="flex flex-col flex-1 items-center">
          <div className="w-full space-y-2">
            <div className="space-y-0.5">
              <input
                type="text"
                className={clsx('w-full input')}
                placeholder="Name"
                data-testid="newAddress/nameInput"
              />
            </div>
            <div className="space-y-0.5">
              <input
                type="text"
                className={clsx('w-full input')}
                placeholder="Address (B62...)"
                data-testid="newAddress/addressInput"
              />
            </div>
          </div>
          <button type="button" className="mt-auto px-12 btn btn-primary" disabled={false} data-testid="submitForm">
            Add contact
          </button>
        </div>
      </div>
    </AppLayout>
  );
};
