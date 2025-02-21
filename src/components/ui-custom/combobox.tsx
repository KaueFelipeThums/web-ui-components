import { ReactElement } from 'react';
import { Icon } from './icon';
import { SelectOptionsProps } from './select';
import {
  Combobox as BaseCombobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxLoading,
  ComboboxItem,
  ComboboxEmpty,
  ComboboxGroup,
} from '@/components/ui/combobox';
import { cn } from '@/lib/utils';

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

  type?: 'single';
};

/**
 * Componente de seleção com busca personalizada.
 *
 * @param {SelectSearchProps} props - Propriedades do componente.
 * @returns {ReactElement}
 */
const Combobox = ({
  placeholder,
  options = [],
  className,
  value,
  heading,
  emptyText = 'Nenhum registro encontrado!',
  disabled,
  onSearch,
  loading,
  ...props
}: ComboboxProps): ReactElement => {
  return (
    <BaseCombobox
      {...props}
      type="single"
      className={cn(className)}
      disabled={disabled}
      defaultValue={undefined}
      value={value ?? ''}
      shouldFilter={onSearch ? false : true}
      onInputValueChange={onSearch}
    >
      <ComboboxInput placeholder={placeholder} disabled={disabled} />
      <ComboboxContent>
        {loading && <ComboboxLoading />}
        <ComboboxEmpty className="flex flex-col gap-1 items-center justify-center text-muted-foreground p-2">
          <Icon name="PackageOpen" className="h-8 w-8" />
          {emptyText && <span className="text-sm">{emptyText}</span>}
        </ComboboxEmpty>
        <ComboboxGroup heading={heading}>
          {options.map((option) => (
            <ComboboxItem key={option.value} value={option.value}>
              {option.label}
            </ComboboxItem>
          ))}
        </ComboboxGroup>
      </ComboboxContent>
    </BaseCombobox>
  );
};

export { Combobox };
