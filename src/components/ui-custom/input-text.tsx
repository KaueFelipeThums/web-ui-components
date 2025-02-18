import React, { forwardRef, ReactElement, ReactNode } from 'react';
import { BaseInput } from '@/components/ui';
import { cn } from '@/lib/utils';

type InputTextProps = React.ComponentProps<typeof BaseInput> & {
  /** Classe CSS para o container do input. */
  className?: string;

  /** Classe CSS personalizada para o campo de entrada. */
  inputClassName?: string;

  /** Componente renderizado à direita do input. */
  rightComponent?: ReactNode;

  /** Componente renderizado à esquerda do input. */
  leftComponent?: ReactNode;

  /** Status do campo, pode ser 'error', 'warning' ou 'default'. */
  status?: 'error' | 'warning' | 'default' | undefined;
};

/**
 * Componente de input de texto personalizado.
 *
 * @param {InputTextProps}
 * @returns {ReactElement}
 */
const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  ({ className, inputClassName, rightComponent, leftComponent, status, ...props }, ref): ReactElement => {
    return (
      <div className={cn('relative', className)}>
        {leftComponent && (
          <div className={cn('left-0 top-0 h-10 w-10 absolute flex items-center justify-center')}>{leftComponent}</div>
        )}
        <BaseInput
          ref={ref}
          {...props}
          className={cn(
            leftComponent && 'pl-10',
            rightComponent && 'pr-10',
            status === 'error' ? 'border-destructive' : '',
            status === 'warning' ? 'border-orange-500' : '',
            inputClassName,
          )}
        />
        {rightComponent && (
          <div className={cn('right-0 top-0 h-10 w-10 absolute flex items-center justify-center')}>
            {rightComponent}
          </div>
        )}
      </div>
    );
  },
);

InputText.displayName = 'InputText';

export { InputText, type InputTextProps };
