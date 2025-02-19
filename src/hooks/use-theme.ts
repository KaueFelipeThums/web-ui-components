import { useContext } from 'react';
import { ThemeProviderContext, ThemeProviderType } from '@/providers/theme-provider';

/**
 * Hook para acessar o contexto de tema.
 *
 * @returns {ThemeProviderType}
 */
const useTheme = (): ThemeProviderType => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};

export { useTheme };
