import { useState } from 'react';
import AztecIcon from '../../common/assets/aztec.svg?react';

type SendFormProps = {
  sendToken: (receiverAddress: string, amount: string) => void;
  isProgress: boolean;
};

export const SendForm = ({ sendToken, isProgress }: SendFormProps) => {
  const [receiverAddress, setReceiverAddress] = useState<string>('');
  const [amount, setAmount] = useState('');
  return (
    <div
      className="flex flex-col gap-1 flex-1 pb-8 items-center"
      // onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex justify-between items-center w-full">
        <h1 className="text-3xl">Send</h1>
      </div>
      <div className="card bg-secondary w-full flex flex-row justify-between items-center p-2 mb-1">
        <div className="flex gap-2">
          <div className="btn btn-neutral btn-circle">
            <AztecIcon width={24} height={24} />
          </div>
          <div className="flex flex-col">
            <div>Aztec</div>
            <div className="text-[#7D7A9C]">Aztec</div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex flex-col text-right">
            <div>124</div>
            <div className="text-[#7D7A9C]">$12.3</div>
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
            setAmount(e.target.value);
          }}
        />
      </label>

      <button
        type="button"
        disabled={!amount || !receiverAddress}
        className="btn btn-primary max-w-48 w-full mt-auto"
        data-testid="formSubmit"
        onClick={() => {
          sendToken(receiverAddress, amount);
        }}>
        Send
      </button>
    </div>
  );
};
