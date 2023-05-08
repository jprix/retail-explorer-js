import React, { useContext } from 'react';
import { TopNavigation } from '@cloudscape-design/components';
import { ProfileContext } from '../context/profileContext';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header() {
  const { userProfile } = useContext(ProfileContext);
  const router = useRouter();

  const handleLogoClick = (e) => {
    e.preventDefault();
    router.push('/');
  };

  const name = userProfile?.name;

  return (
    <TopNavigation
      identity={{
        href: '/',
        title: 'Coin Auth',
        logo: {
          src: '/rose-interiors-logo.png',
          alt: 'rose-interiors-logo',
          onClick: handleLogoClick,
        },
      }}
      utilities={[
        {
          type: 'menu-dropdown',
          text: name ? userProfile?.name : 'Sign in',
          iconName: 'user-profile',
          iconAlign: 'right',
          items: [{ id: 'signout', text: 'Sign out' }],
        },
      ]}
      i18nStrings={{
        searchIconAriaLabel: 'Search',
        searchDismissIconAriaLabel: 'Close search',
        overflowMenuTriggerText: 'More',
        overflowMenuTitleText: 'All',
        overflowMenuBackIconAriaLabel: 'Back',
        overflowMenuDismissIconAriaLabel: 'Close menu',
      }}
    />
  );
}
