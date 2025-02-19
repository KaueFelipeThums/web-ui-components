import React, { ReactElement } from 'react';
import { Icon } from './icon';
import { BaseSelect, BaseSelectContent, BaseSelectItem, BaseSelectTrigger, BaseSelectValue } from '@/components/ui';
import { cn } from '@/lib/utils';

type SelectOptionsProps = {
  /** Valor da opção. */
  value: string;

  /** Rótulo exibido para a opção. */
  label: string;

  /** Define se a opção está desabilitada. */
  disabled?: boolean;
};

type SelectProps = Omit<React.ComponentProps<typeof BaseSelect>, 'value' | 'className'> & {
  /** Nome da classe CSS personalizada. */
  className?: string;

  /** Texto exibido como placeholder no campo de seleção. */
  placeholder?: string;

  /** Lista de opções a serem exibidas no seletor. */
  options?: SelectOptionsProps[];

  /** Valor selecionado no campo de seleção. */
  value?: string | undefined | null;

  /** Status do campo, pode ser 'error', 'warning' ou 'default'. */
  status?: 'error' | 'warning' | 'default' | undefined;

  /** Define se o campo de seleção está carregando. */
  loading?: boolean;
};

/**
 * Componente de seletor de opções customizado.
 *
 * @param {SelectProps} props - As propriedades do componente.
 * @returns {JSX.Element}
 */
const Select = ({
  value = '',
  placeholder,
  className,
  options = [],
  status,
  loading,
  ...props
}: SelectProps): ReactElement => {
  return (
    <BaseSelect {...props} value={value ?? ''} onValueChange={(value) => value !== '' && props.onValueChange?.(value)}>
      <BaseSelectTrigger
        className={cn(
          status === 'error' ? 'border-destructive' : '',
          status === 'warning' ? 'border-orange-500' : '',
          className,
        )}
      >
        <BaseSelectValue placeholder={placeholder} />
      </BaseSelectTrigger>
      <BaseSelectContent position="popper" onWheel={(e) => e.stopPropagation()} className="max-w-[100dvw] relative">
        {loading && (
          <div className="absolute inset-0 w-full h-full z-50 backdrop-blur-sm flex items-center justify-center">
            <Icon name="LoaderCircle" size={18} className="animate-spin h-8 w-8" />
          </div>
        )}
        {options?.map((option) => (
          <BaseSelectItem key={option.value} value={option.value} disabled={option.disabled}>
            <span className="break-all">{option.label}</span>
          </BaseSelectItem>
        ))}

        {options.length === 0 && (
          <div className="flex flex-col gap-1 items-center justify-center text-muted-foreground p-2">
            <Icon name="PackageOpen" className="h-8 w-8" />
            <span className="text-sm">Sem dados!</span>
          </div>
        )}
      </BaseSelectContent>
    </BaseSelect>
  );
};

Select.displayName = 'Select';

export { Select, type SelectOptionsProps };
