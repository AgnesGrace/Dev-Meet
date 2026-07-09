import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';

interface ThemeProviderProp {
  children: ReactNode;
}
export default function AppThemeProvider({ children }: ThemeProviderProp) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
