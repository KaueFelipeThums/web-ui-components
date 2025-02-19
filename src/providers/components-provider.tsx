import { ReactElement, ReactNode } from 'react';
import { ToasterProps } from 'sonner';
import PopConfirmProvider from './popconfirm-provider';
import { ThemeProvider } from './theme-provider';
import { TooltipProvider } from '@/components/ui';
import { Toaster } from '@/components/ui-custom';

type RootProviderProps = {
  /** posição do toast */
  toastPosition?: ToasterProps['position'];

  /** Tema padrão */
  defaultTheme?: 'light' | 'dark' | 'system';

  /** Conteúdo filho */
  children: ReactNode;
};

/**
 * Componente de provedor de componentes.
 *
 * @param {RootProviderProps}
 * @returns {ReactElement}
 */

const ComponentsProvider = ({
  children,
  toastPosition = 'top-center',
  defaultTheme = 'light',
}: RootProviderProps): ReactElement => {
  return (
    <ThemeProvider defaultTheme={defaultTheme}>
      <TooltipProvider>
        <PopConfirmProvider>{children}</PopConfirmProvider>
      </TooltipProvider>
      <Toaster position={toastPosition} />
    </ThemeProvider>
  );
};

export { ComponentsProvider };
