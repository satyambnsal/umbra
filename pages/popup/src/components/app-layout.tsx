// import { install } from "@github/hotkey"
import type React from 'react';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  // const location = useLocation()
  // biome-ignore lint: dependent just on location
  // useEffect(() => {
  //   if (typeof document === "undefined") return
  //   for (const el of document.querySelectorAll("[data-hotkey]")) {
  //     install(el as never)
  //   }
  // }, [location])
  return (
    <div className="flex flex-col flex-1 bg-[#1a2b3c]" data-testid="appLayout">
      {children}
    </div>
  );
};
