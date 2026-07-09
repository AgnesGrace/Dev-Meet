'use client';

import AppThemeProvider from '@/components /themes/app-theme-provider';
import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren } from 'react';

export default function Providers({ children }: PropsWithChildren) {
  return <SessionProvider><AppThemeProvider>{children}
    </AppThemeProvider></SessionProvider>;
}
