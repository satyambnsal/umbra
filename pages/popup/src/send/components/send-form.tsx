import { useState } from 'react';
import AztecIcon from '../../common/assets/aztec.svg?react';
import { useAtomValue } from 'jotai';
import { currentTokenContractAtom, isPrivateAtom, privateBalanceAtom, publicBalanceAtom } from '@src/atoms.js';
import { toast } from 'sonner';
import type { sendTokenFnType } from '../routes/send.js';
import { Loader2Icon } from 'lucide-react';

type SendFormProps = {
  sendToken: sendTokenFnType;
  isProgress: boolean;
};

export const SendForm = ({ sendToken, isProgress }: SendFormProps) => {
  const [receiverAddress, setReceiverAddress] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const isPrivate = useAtomValue(isPrivateAtom);
  const privateBalance = useAtomValue(privateBalanceAtom);
  const publicBalance = useAtomValue(publicBalanceAtom);
  const currentTokenContract = useAtomValue(currentTokenContractAtom);
  const currentBalance = isPrivate ? privateBalance : publicBalance;

  const handleSendToken = () => {
    if (!receiverAddress) {
      return toast.error('Enter receiver address');
    }
    // if (+amount <= 0) {
    //   return toast.error('Enter amount greater than zero')
    // }
    // if (amount > currentBalance) {
    //   return toast.error('Insufficient Balance')
    // }
    return sendToken({ receiverAddress, amount, isPrivate });
  };

  return (
    <div
      className="flex flex-col gap-1 flex-1 pb-8 items-center"
      // onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex justify-between items-center w-full mb-3">
        <h1 className="text-3xl">Send {isPrivate ? '(Private Mode)' : '(Public Mode)'}</h1>
      </div>
      <div className="card bg-secondary w-full flex flex-row justify-between items-center p-2 mb-1">
        <div className="flex gap-2">
          <div className="btn btn-neutral btn-circle">
            <AztecIcon width={24} height={24} />
          </div>
          <div className="flex flex-col">
            <div>{currentTokenContract?.name ?? 'NA'}</div>
            <div className="text-[#7D7A9C]">{currentTokenContract?.symbol ?? 'NA'}</div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex flex-col text-right">
            <div> {currentBalance.toString()}</div>
          </div>
        </div>
      </div>
      <label className="input flex items-center gap-2 py-7 w-full">
        <input
          id="receiverAddress"
          type="text"
          className="grow"
          placeholder="Address"
          data-testid="send/to"
          onChange={e => {
            setReceiverAddress(e.target.value);
          }}
          // {...register("to")}
        />
      </label>
      <label className="input flex items-center gap-2 py-7 w-full">
        <input
          id="amount"
          type="text"
          className="grow"
          placeholder="Amount"
          data-testid="send/amount"
          onChange={e => {
            setAmount(+e.target.value);
          }}
        />
      </label>

      <button
        type="button"
        disabled={!amount || !receiverAddress || !currentTokenContract || isProgress}
        className="btn btn-primary max-w-48 w-full mt-auto"
        data-testid="formSubmit"
        onClick={handleSendToken}>
        Send
        {isProgress ? <Loader2Icon className="animate-spin" size={16} /> : ''}
      </button>
    </div>
  );
};
