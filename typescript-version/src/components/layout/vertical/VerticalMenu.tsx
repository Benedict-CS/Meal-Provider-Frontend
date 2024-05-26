'use client'

import { useParams } from 'next/navigation'
import { useTheme } from '@mui/material/styles'
import type { getDictionary } from '@/utils/getDictionary'
import { Menu, MenuItem, MenuSection } from '@menu/vertical-menu'
import { useSettings } from '@core/hooks/useSettings'
import useVerticalNav from '@menu/hooks/useVerticalNav'
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'
import React, { useEffect, useState } from 'react';

interface User {
  name: string;
  email: string;
  image: string;
}

type Props = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>
  scrollMenu: (container: any, isPerfectScrollbar: boolean) => void
}

const VerticalMenu = ({ }: Props) => {
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()
  const { settings } = useSettings()
  const params = useParams()
  const { lang: locale } = params
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const res = await fetch('/api/auth/session');
      const data = await res.json();
      if (data.user) {
        setUser(data.user);
      }
    };

    fetchSession();
  }, []);

  return (
    <Menu menuItemStyles={menuItemStyles(verticalNavOptions, theme, settings)} menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)} >
      {user && user.email === 'admin@gmail.com' ? (
        <MenuSection label="Apps & Pages">
          <MenuItem icon={<i className='tabler-dots' />} href={`/${locale}/apps/menu-management`}>Menu Management</MenuItem>
          <MenuItem icon={<i className='tabler-file' />} href={`/${locale}/apps/order-management`}>Order Management</MenuItem>
          <MenuItem icon={<i className='tabler-list' />} href={`/${locale}/apps/credit-management/list`}>Credit Management</MenuItem>
          <MenuItem icon={<i className='tabler-star' />} href={`/${locale}/apps/review-management`}>Rating Management</MenuItem>
        </MenuSection>
      ) : (
        <MenuSection label="Apps & Pages">
          <MenuItem icon={<i className='tabler-dots' />} href={`/${locale}/apps/menu`}>Menu</MenuItem>
          <MenuItem icon={<i className='tabler-home' />} href={`/${locale}/apps/order-cart`}>Order Cart</MenuItem>
          <MenuItem icon={<i className='tabler-file' />} href={`/${locale}/apps/order-record`}>Order Record</MenuItem>
          <MenuItem icon={<i className='tabler-list' />} href={`/${locale}/apps/credit-management`}>Credit Record</MenuItem>
          <MenuItem icon={<i className='tabler-star' />} href={`/${locale}/apps/review-management`}>Rating</MenuItem>
        </MenuSection>
      )}
    </Menu>
  )
}

export default VerticalMenu
