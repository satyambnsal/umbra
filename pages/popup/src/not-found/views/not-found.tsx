import { AppLayout } from '@src/components/app-layout.js';
import { MenuBar } from '@src/components/menu-bar.js';

type NotFoundViewProps = {
  onGoToDashboard: () => void;
  onGoBack: () => void;
};

export const NotFoundView = ({ onGoBack, onGoToDashboard }: NotFoundViewProps) => {
  return (
    <AppLayout>
      <MenuBar variant="back" onBackClicked={onGoBack} />
      <div className="flex flex-col flex-1 gap-4 p-4 items-center">
        <div className="flex flex-1 justify-center items-center">
          <div>Sorry, but we couldn&apos;t find this page</div>
        </div>
        <button type="button" className="btn btn-primary max-w-48 w-full" onClick={onGoToDashboard}>
          Go to Dashboard
        </button>
      </div>
    </AppLayout>
  );
};
