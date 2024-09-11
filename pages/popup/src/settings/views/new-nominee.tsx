import clsx from 'clsx';
import { MenuBar } from '@src/components/menu-bar';

type NewNomineeViewProps = {
  onGoBack: () => void;
  onSubmit: (contact: { name: string; address: string }) => void;
};

export const NewNomineeView = ({ onGoBack }: NewNomineeViewProps) => {
  return (
    <div className="flex flex-col flex-1 bg-[#1a2b3c]" data-testid="appLayout">
      <div className="pb-12 bg-secondary rounded-b-2xl">
        <MenuBar variant="back" onBackClicked={onGoBack} />
        <h2 className="ml-8 mt-1 text-3xl">New Nominee</h2>
      </div>
      <div className="pt-6 pb-8 px-8 flex flex-col flex-1">
        <form className="flex flex-col flex-1 items-center">
          <div className="w-full space-y-2">
            <div className="space-y-0.5">
              <input
                type="text"
                className={clsx('w-full input', false && 'input-bordered input-error')}
                placeholder="Name"
                data-testid="newAddress/nameInput"
                // {...register('name')}
              />
              {/* {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>} */}
            </div>
            <div className="space-y-0.5">
              <input
                type="text"
                className={clsx('w-full input', false && 'input-bordered input-error')}
                //TODO: replace 0X1 according to the address of Umbra wallet
                placeholder="Address (0X1...)"
                data-testid="newAddress/addressInput"
                // {...register('address')}
              />
              {/* {errors.address && <p className="text-xs text-red-400">{errors.address.message}</p>} */}
            </div>
          </div>
          <button
            type="submit"
            className="mt-auto px-12 btn btn-primary"
            // disabled={disableSubmit}
            data-testid="submitForm">
            Add contact
          </button>
        </form>
      </div>
    </div>
  );
};
