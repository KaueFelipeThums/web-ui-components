import { createContext, ReactElement, ReactNode, useState } from 'react';
import { AlertDialog } from '@/components/ui-custom';

type ConfirmStateProps = Pick<
  React.ComponentProps<typeof AlertDialog>,
  'onConfirm' | 'onCancel' | 'title' | 'description' | 'cancelText' | 'confirmText' | 'variant' | 'hideCancelButton'
> & {
  /** Indica se a caixa de diálogo está aberta. */
  isOpen?: boolean;
};

type PopConfirmProviderProps = {
  children: ReactNode;
};

type PopConfirmProviderType = {
  open: (config: ConfirmStateProps) => void;
};

const PopConfirmContext = createContext<PopConfirmProviderType>({
  open: () => {},
});

const defaultValues: ConfirmStateProps = {
  isOpen: false,
  onConfirm: () => {},
  onCancel: () => {},
  title: '',
  description: undefined,
  cancelText: 'Cancelar',
  confirmText: 'Sim',
  hideCancelButton: false,
  variant: 'default',
};

/**
 * Provedor do contexto de confirmação.
 *
 * @param {PopConfirmProviderProps}
 * @returns {ReactElement}
 */
const PopConfirmProvider = ({ children }: PopConfirmProviderProps): ReactElement => {
  const [confirmState, setConfirmState] = useState<ConfirmStateProps>(defaultValues);

  const open = (config: ConfirmStateProps) => {
    setConfirmState((state) => ({
      ...state,
      isOpen: true,
      ...config,
    }));
  };

  const close = () => setConfirmState((state) => ({ ...state, isOpen: false }));

  const handleCancel = () => {
    if (confirmState.onCancel) {
      confirmState.onCancel();
    }

    close();
  };

  const handleConfirm = () => {
    if (confirmState.onConfirm) {
      confirmState.onConfirm();
    }
    close();
  };

  const onOpenChange = (open: boolean) => {
    if (!open) close();
  };

  return (
    <PopConfirmContext.Provider value={{ open }}>
      <AlertDialog
        open={confirmState.isOpen}
        title={confirmState.title ?? ''}
        description={confirmState.description}
        onOpenChange={onOpenChange}
        cancelText={confirmState.cancelText}
        confirmText={confirmState.confirmText}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        variant={confirmState.variant}
        hideCancelButton={confirmState.hideCancelButton}
      />
      {children}
    </PopConfirmContext.Provider>
  );
};

export type { PopConfirmProviderType };
export { PopConfirmContext };
export default PopConfirmProvider;
