import { useContext } from 'react';
import { PopConfirmContext, PopConfirmProviderType } from '@/providers/popconfirm-provider';

/**
 * Hook para acessar o contexto de confirmação.
 *
 * @returns {PopConfirmProviderType}
 */
const usePopConfirm = (): PopConfirmProviderType => {
  const context = useContext(PopConfirmContext);
  if (context === undefined) throw new Error('usePopConfirm must be used within a PopConfirmProvider');
  return context;
};

export { usePopConfirm };
