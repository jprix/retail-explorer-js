/**
 * Copyright 2022 Coinbase Global, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useContext } from 'react';
import { TopNavigation } from '@cloudscape-design/components';
import { ProfileContext } from '../context/profileContext';
import { useRouter } from 'next/router';

export default function Header() {
  const { userProfile } = useContext(ProfileContext);
  const router = useRouter();

  const name = userProfile?.name;
  return (
    <TopNavigation
      identity={{
        href: '/',
        title: 'Coin Auth',
        logo: {
          src: '/rose-interiors-logo.png',
          alt: 'rose-interiors-logo',
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
