import { SettingsPageLayout } from '@src/components/settings-page-layout.js';
import { Coins, DollarSign, Info, KeySquare, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Links = [
  {
    label: 'Nominee',
    description: 'Add the Nominee',
    href: '/settings/nominee',
    Icon: Shield,
  },
  {
    label: 'Keys',
    description: 'Explore your keys',
    href: '/settings/keys',
    Icon: KeySquare,
  },
  {
    label: 'About',
    description: 'Everything about us',
    href: '/settings/about',
    Icon: Info,
  },
  {
    label: 'Faucets',
    description: 'Mint Faucets',
    href: '/settings/faucet',
    Icon: DollarSign,
  },
  {
    label: 'Tokens',
    description: 'Switch Tokens',
    href: '/settings/tokens',
    Icon: Coins,
  },
];

type SettingsViewProps = {
  onCloseClicked: () => void;
  onDonateClicked: () => void;
  onLogOut: () => void;
};

export const SettingsView = ({ onCloseClicked, onLogOut }: SettingsViewProps) => {
  return (
    <div className="flex flex-col flex-1 bg-[#1a2b3c]" data-testid="appLayout">
      <SettingsPageLayout title="Settings" onCloseClicked={onCloseClicked}>
        <div className="flex flex-col items-center space-y-6">
          <div className="w-full space-y-2">
            {Links.map(link => {
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className="p-4 flex items-center space-x-4 bg-secondary rounded-2xl">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral">
                    <link.Icon width={24} height={24} className="text-[#F6C177]" />
                  </div>
                  <div>
                    <p>{link.label}</p>
                    <p className="text-sm">{link.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
          <button type="button" className="px-10 btn" data-testid="settings/logOut" onClick={onLogOut} disabled>
            Log out
          </button>
        </div>
      </SettingsPageLayout>
    </div>
  );
};
