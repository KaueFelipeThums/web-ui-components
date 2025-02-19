import { forwardRef, ReactElement, ReactNode } from 'react';
import { BaseRadioGroup, BaseRadioGroupItem, Label } from '@/components/ui';
import { cn } from '@/lib/utils';

type RadioGroupOptionProps = {
  /** Rótulo da opção. */
  label: ReactNode;

  /** Valor da opção. */
  value: string;

  /** Se a opção está desabilitada. */
  disabled?: boolean;
};

type RadioGroupProps = React.ComponentProps<typeof BaseRadioGroup> & {
  /** Opções para o grupo de rádio. */
  options: RadioGroupOptionProps[];

  /** Orientação do grupo, pode ser 'vertical' ou 'horizontal'. */
  direction?: 'vertical' | 'horizontal';

  /** Valor da opção selecionada. */
  value?: string;

  /** Status do campo, pode ser 'error', 'warning' ou 'default'. */
  status?: 'error' | 'warning' | 'default' | undefined;
};

/**
 * Componente de grupo de rádio button personalizado.
 *
 * @param {RadioGroupProps}
 * @returns {ReactElement}
 */
const RadioGroup = forwardRef<React.ComponentRef<typeof BaseRadioGroup>, RadioGroupProps>(
  ({ value = '', options, direction = 'vertical', status, ...props }, ref): ReactElement => {
    return (
      <BaseRadioGroup
        ref={ref}
        value={value ?? ''}
        {...props}
        className={cn(`flex flex-wrap gap-3 ${direction === 'vertical' ? 'flex-col' : 'flex-row'}`)}
      >
        {options.map((option) => (
          <div className="flex items-center gap-2" key={option.value}>
            <BaseRadioGroupItem
              value={option.value}
              disabled={option.disabled}
              className={cn(
                status === 'error' ? 'border-destructive' : '',
                status === 'warning' ? 'border-orange-500' : '',
              )}
              id={`radio-${option.value}`}
            />
            <Label
              className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none break-all cursor-pointer flex-1"
              htmlFor={`radio-${option.value}`}
            >
              {option.label}
            </Label>
          </div>
        ))}
      </BaseRadioGroup>
    );
  },
);

RadioGroup.displayName = 'RadioGroup';

export { RadioGroup, type RadioGroupOptionProps };
