import { createContext, ReactElement, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
  /** Conteúdo filho que será envolto pelo provedor. */
  children: React.ReactNode;

  /** Tema padrão utilizado caso o usuário não tenha definido um tema. */
  defaultTheme?: Theme;

  /** Chave de armazenamento no localStorage. */
  storageKey?: string;
};

type ThemeProviderType = {
  /** O tema atual. */
  theme: Theme;

  /** Função para atualizar o tema. */
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderType = {
  theme: 'system',
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderType>(initialState);

/**
 * Provedor de tema que gerencia o tema da aplicação, permitindo persistência em localStorage.
 *
 * @param {ThemeProviderProps}
 * @returns {ReactElement}
 */
const ThemeProvider = ({
  children,
  defaultTheme = 'system',
  storageKey = 'genifiq-theme',
  ...props
}: ThemeProviderProps): ReactElement => {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem(storageKey) as Theme) || defaultTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
      return;
    }
    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
};

export type { ThemeProviderType };
export { ThemeProviderContext };
export { ThemeProvider };
