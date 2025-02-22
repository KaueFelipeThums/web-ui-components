import React, { ReactElement } from 'react';
import { Toaster as BaseToaster } from '@/components/ui/sonner';

type ToasterProps = React.ComponentProps<typeof BaseToaster>;

/**
 * Componente para exibir um toster personalizado usando a biblioteca `sonner`.
 *
 * @param {ToasterProps}
 * @returns {ReactElement}
 */
const Toaster = ({ position }: ToasterProps): ReactElement => {
  return (
    <BaseToaster
      position={position}
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg gap-3',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-background group-[.toast]:text-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',

          icon: 'group-data-[type=error]:text-red-500 group-data-[type=success]:text-green-500 group-data-[type=warning]:text-amber-500 group-data-[type=info]:text-blue-500',
        },
      }}
    />
  );
};

Toaster.displayName = 'Toaster';

export { Toaster };
