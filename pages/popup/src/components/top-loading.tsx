import { Loader2Icon } from 'lucide-react';

export const LoadingScreen = () => {
  return (
    <div className="p-5 flex items-center justify-center h-full min-h-screen">
      <div>
        <Loader2Icon className="animate-spin" />
      </div>
    </div>
  );
};
