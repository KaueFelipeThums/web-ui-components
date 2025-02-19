import { toast as sonnerToast } from 'sonner';

type ToastProps = {
  /** Exibe um toast de sucesso. */
  success: (message: string, description?: string) => void;

  /** Exibe um toast de erro. */
  error: (message: string, description?: string) => void;

  /** Exibe um toast de informação. */
  info: (message: string, description?: string) => void;

  /** Exibe um toast de aviso. */
  warning: (message: string, description?: string) => void;
};

/**
 * Funções para exibir toasts usando a biblioteca `sonner`.
 */
const toast: ToastProps = {
  /**
   * Exibe um toast de sucesso.
   *
   * @param {string} message - A mensagem do toast.
   * @param {string} [description] - Descrição adicional do toast.
   */
  success: (message: string, description: string = '') =>
    sonnerToast.success(message, {
      description,
      action: {
        label: 'Fechar',
        onClick: () => null,
      },
    }),

  /**
   * Exibe um toast de erro.
   *
   * @param {string} message - A mensagem do toast.
   * @param {string} [description] - Descrição adicional do toast.
   */
  error: (message: string, description: string = '') =>
    sonnerToast.error(message, {
      description,
      action: {
        label: 'Fechar',
        onClick: () => null,
      },
    }),

  /**
   * Exibe um toast de informação.
   *
   * @param {string} message - A mensagem do toast.
   * @param {string} [description] - Descrição adicional do toast.
   */
  info: (message: string, description: string = '') =>
    sonnerToast.info(message, {
      description,
      action: {
        label: 'Fechar',
        onClick: () => null,
      },
    }),

  /**
   * Exibe um toast de aviso.
   *
   * @param {string} message - A mensagem do toast.
   * @param {string} [description] - Descrição adicional do toast.
   */
  warning: (message: string, description: string = '') =>
    sonnerToast.warning(message, {
      description,
      action: {
        label: 'Fechar',
        onClick: () => null,
      },
    }),
};

export { toast };
