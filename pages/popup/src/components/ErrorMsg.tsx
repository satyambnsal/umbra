import { useRPC } from '@src/hooks/useRPC.js';
import { useState } from 'react';

type ErrorMessageType = {
  errorMessage: string;
  handlePXEConnection: () => void;
};

export const ErrorMessage = ({ errorMessage, handlePXEConnection }: ErrorMessageType) => {
  const { rpcUrl, setRpcUrlFn } = useRPC();
  const [rpcUrlInput, setRpcUrlInput] = useState(rpcUrl);
  return (
    <div className="p-5 text-center">
      <p className="mb-3">{errorMessage}</p>

      <div className="flex items-center gap-3">
        <input
          className="rounded-md px-2 py-1"
          value={rpcUrlInput}
          onChange={e => {
            setRpcUrlInput(e.target.value);
          }}
        />
        <div>
          <button
            onClick={() => {
              setRpcUrlFn(rpcUrlInput);
            }}
            className="btn btn-primary btn-sm">
            Update URL
          </button>
          <button
            onClick={() => {
              handlePXEConnection();
            }}
            className="btn btn-primary btn-sm">
            Reconnect
          </button>
        </div>
      </div>
    </div>
  );
};
