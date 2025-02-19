import React, { ReactElement } from 'react';
import { Toaster as BaseToaster } from '@/components/ui/sonner';

const toastConfig = {
  classNames: {
    toast:
      'group group-[.toaster]:pointer-events-auto toast group-[.toaster]:bg-background group-[.toaster]:border-border group-[.toaster]:shadow-lg gap-3',
    description: 'group-[.toast]:text-muted-foreground',
    actionButton: 'group-[.toast]:bg-background group-[.toast]:text-foreground',
    cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
    error: 'bg-red-100 text-red-500 border border-red-400',
    success: 'bg-green-100 text-green-700 border border-green-400',
    warning: 'bg-yellow-100 text-orange-600 border border-yellow-400',
    info: 'bg-background text-foreground border border-blue-400',
  },
};

type ToasterProps = React.ComponentProps<typeof BaseToaster>;

/**
 * Componente para exibir um toster personalizado usando a biblioteca `sonner`.
 *
 * @param {ToasterProps}
 * @returns {ReactElement}
 */
const Toaster = ({ position }: ToasterProps): ReactElement => {
  return <BaseToaster position={position} toastOptions={toastConfig} />;
};

Toaster.displayName = 'Toaster';

export { Toaster };
