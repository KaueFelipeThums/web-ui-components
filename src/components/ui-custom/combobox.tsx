import { ReactElement, useState } from 'react';
import { Icon } from './icon';
import { SelectOptionsProps } from './select';
import {
  BaseCombobox,
  BaseComboboxContent,
  BaseComboboxInput,
  BaseComboboxLoading,
  BaseComboboxItem,
  BaseComboboxEmpty,
  BaseComboboxGroup,
} from '@/components/ui';

type ComboboxProps = React.ComponentProps<typeof BaseCombobox> & {
  /** Valor selecionado no campo. */
  value?: string | null;

  /** Texto exibido como placeholder no campo de busca. */
  placeholder?: string;

  /** Texto exibido quando nenhuma opção for encontrada. */
  emptyText?: string;

  /** Título exibido acima da lista de opções. */
  heading?: string;

  /** Define se o campo está desabilitado. */
  disabled?: boolean;

  /** Lista de opções a serem exibidas no seletor. */
  options?: SelectOptionsProps[];

  /** Função chamada durante a digitação na busca. */
  onSearch?: (value: string) => void;

  /** Define se o campo está carregando. */
  loading?: boolean;

  /** Classe personalizada para o container do campo de busca. */
  containerClassName?: string;

  type?: 'single';
};

/**
 * Componente de seleção com busca personalizada.
 *
 * @param {ComboboxProps}
 * @returns {ReactElement}
 */
const Combobox = ({
  placeholder,
  options = [],
  className,
  containerClassName,
  value,
  heading,
  emptyText = 'Nenhum registro encontrado!',
  disabled,
  onSearch,
  loading,
  type = 'single',
  ...props
}: ComboboxProps): ReactElement => {
  const [inputValue, setInputValue] = useState<string>('');

  const onInputChange = (value: string) => {
    setInputValue(value);
    onSearch?.(value);
  };

  const onInputBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const newInputValue = options.find((option) => option.value === value);
    setInputValue(newInputValue?.label ?? '');
    props.onInputBlur?.(e);
  };

  return (
    <BaseCombobox
      {...props}
      type={type}
      className={containerClassName}
      disabled={disabled}
      defaultValue={undefined}
      value={value ?? ''}
      shouldFilter={onSearch ? false : true}
      onInputValueChange={onInputChange}
      inputValue={inputValue}
      onInputBlur={onInputBlur}
    >
      <BaseComboboxInput className={className} placeholder={placeholder} disabled={disabled} />
      <BaseComboboxContent>
        {loading ? (
          <BaseComboboxLoading />
        ) : (
          <>
            <BaseComboboxEmpty className="flex flex-col gap-1 items-center justify-center text-muted-foreground p-2">
              <Icon name="PackageOpen" className="h-8 w-8" />
              {emptyText && <span className="text-sm">{emptyText}</span>}
            </BaseComboboxEmpty>
            <BaseComboboxGroup heading={heading}>
              {options.map((option) => (
                <BaseComboboxItem key={option.value} value={option.value}>
                  {option.label}
                </BaseComboboxItem>
              ))}
            </BaseComboboxGroup>
          </>
        )}
      </BaseComboboxContent>
    </BaseCombobox>
  );
};

export { Combobox };
