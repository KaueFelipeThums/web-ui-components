import React, { forwardRef, ReactElement } from 'react';
import { BaseTextarea } from '@/components/ui';
import { cn } from '@/lib/utils';

type TextAreaProps = React.ComponentProps<typeof BaseTextarea> & {
  /** Status do campo, pode ser 'error', 'warning' ou 'default'. */
  status?: 'error' | 'warning' | 'default' | undefined;
};

/**
 * Componente de textarea personalizado.
 *
 * @param {TextAreaProps}
 * @returns {ReactElement}
 */
const TextArea = forwardRef<React.ComponentRef<typeof BaseTextarea>, TextAreaProps>(
  ({ status, className, ...props }, ref): ReactElement => {
    return (
      <BaseTextarea
        ref={ref}
        {...props}
        className={cn(
          status === 'error' ? 'border-destructive' : '',
          status === 'warning' ? 'border-orange-500' : '',
          className,
        )}
      />
    );
  },
);

TextArea.displayName = 'TextArea';

export { TextArea };
