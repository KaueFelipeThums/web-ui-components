import { ReactElement } from 'react';
import { Icon } from './icon';
import { SelectOptionsProps } from './select';
import {
  BaseCombobox,
  BaseComboboxContent,
  BaseComboboxLoading,
  BaseComboboxItem,
  BaseComboboxEmpty,
  BaseComboboxGroup,
  BaseComboboxTagsInput,
  BaseComboboxTag,
} from '@/components/ui';

type ComboboxMultipleProps = React.ComponentProps<typeof BaseCombobox> & {
  /** Valor selecionado no campo. */
  value?: string[] | null;

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

  type?: 'multiple';
};

/**
 * Componente de seleção com busca personalizada.
 *
 * @param {ComboboxMultipleProps}
 * @returns {ReactElement}
 */
const ComboboxMultiple = ({
  placeholder,
  options = [],
  containerClassName,
  className,
  value,
  heading,
  emptyText = 'Nenhum registro encontrado!',
  disabled,
  onSearch,
  loading,
  type = 'multiple',
  ...props
}: ComboboxMultipleProps): ReactElement => {
  const onInputChange = (value: string) => {
    onSearch?.(value);
  };

  return (
    <BaseCombobox
      {...props}
      type={type}
      className={containerClassName}
      disabled={disabled}
      defaultValue={undefined}
      value={value ?? []}
      shouldFilter={onSearch ? false : true}
      onInputValueChange={onInputChange}
    >
      <BaseComboboxTagsInput className={className} placeholder={placeholder} disabled={disabled}>
        {value?.map((value) => (
          <BaseComboboxTag key={value} value={value}>
            {options.find((fruit) => fruit.value === value)?.label}
          </BaseComboboxTag>
        ))}
      </BaseComboboxTagsInput>

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

export { ComboboxMultiple };
