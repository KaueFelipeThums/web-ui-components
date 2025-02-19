import { useState, useRef, useCallback, ReactElement } from 'react';
import { Button } from './button';
import { Icon } from './icon';
import { SelectOptionsProps } from './select';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui';
import { cn } from '@/lib/utils';

type SelectSearchProps = {
  /** Texto exibido como placeholder no campo de busca. */
  placeholder?: string;

  /** Nome da classe CSS personalizada. */
  className?: string;

  /** Valor selecionado no campo. */
  value?: string | null;

  /** Texto exibido como placeholder no campo de busca. */
  placeholderSearch?: string;

  /** Título exibido acima da lista de opções. */
  heading?: string;

  /** Define se o campo está desabilitado. */
  disabled?: boolean;

  /** Texto exibido quando não há dados disponíveis. */
  emptyText?: string;

  /** Lista de opções a serem exibidas no seletor. */
  options?: SelectOptionsProps[];

  /** Função chamada quando o valor selecionado muda. */
  onValueChange?: (value: string) => void;

  /** Função chamada durante a digitação na busca. */
  onSearch?: (value: string) => void;

  /** Status do campo, pode ser 'error', 'warning' ou 'default'. */
  status?: 'error' | 'warning' | 'default' | undefined;

  /** Define se o campo está carregando. */
  loading?: boolean;
};

/**
 * Componente de seleção com busca personalizada.
 *
 * @param {SelectSearchProps} props - Propriedades do componente.
 * @returns {ReactElement}
 */
const SelectSearch = ({
  placeholder,
  options = [],
  className,
  placeholderSearch = 'Pesquisar...',
  value,
  onValueChange,
  disabled,
  onSearch,
  heading,
  emptyText = 'Sem dados!',
  status,
  loading,
}: SelectSearchProps): ReactElement => {
  const [open, setOpen] = useState<boolean>(false);
  const selectedItemRef = useRef<HTMLDivElement | null>(null);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : selectedValue;

  const handleChangeInputSearch = useCallback(
    (searchValue: string) => {
      onSearch?.(searchValue);
    },
    [onSearch],
  );

  const handleSelectItem = useCallback(
    (selectedItemValue: string) => {
      if (!isControlled) setSelectedValue(selectedItemValue);
      onValueChange?.(selectedItemValue);
      setOpen(false);
    },
    [onValueChange, isControlled],
  );

  const handleFilter = useCallback(
    (value: string, search: string) => {
      const item = options.find((option) => option.value === value);
      return item?.label?.toLowerCase().includes(search?.toLowerCase()) ? 1 : 0;
    },
    [options],
  );

  const onOpenChange = useCallback((dropDownMenuOpen: boolean) => {
    setOpen(dropDownMenuOpen);
    if (dropDownMenuOpen) setTimeout(() => selectedItemRef.current?.scrollIntoView({ block: 'nearest' }), 0);
  }, []);

  return (
    <Popover modal={true} open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          variant="outline"
          className={cn(
            'justify-between px-3 w-full rounded-md flex border items-center hover:bg-background focus:ring-1 focus:ring-ring',
            status === 'error' ? 'border-destructive' : '',
            status === 'warning' ? 'border-orange-500' : '',
            className,
          )}
        >
          <span className="truncate">
            {options?.find((option) => option?.value === currentValue)?.label ?? placeholder}
          </span>
          <Icon name="ChevronDown" className="text-muted-foreground h-4 w-4 ml-1" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] max-w-[95dvw] min-w-44 p-0 relative">
        {loading && (
          <div className="absolute inset-0 w-full h-full z-50 backdrop-blur-sm flex items-center justify-center">
            <Icon name="LoaderCircle" size={18} className="animate-spin h-8 w-8" />
          </div>
        )}

        <Command shouldFilter={onSearch ? false : true} filter={handleFilter}>
          <CommandInput placeholder={placeholderSearch} disabled={disabled} onValueChange={handleChangeInputSearch} />
          <CommandList>
            <CommandEmpty className="flex flex-col gap-1 items-center justify-center text-muted-foreground p-2">
              <Icon name="PackageOpen" className="h-8 w-8" />
              {emptyText && <span className="text-sm">{emptyText}</span>}
            </CommandEmpty>
            <CommandGroup heading={heading}>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  ref={option.value === currentValue ? selectedItemRef : null}
                  value={option.value}
                  disabled={disabled || option.disabled}
                  onSelect={handleSelectItem}
                >
                  {option.value === currentValue ? (
                    <Icon name="Check" className="h-4 w-4 mr-2" />
                  ) : (
                    <div className="h-4 w-4 mr-2" />
                  )}
                  <span className="break-all flex-1">{option.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

SelectSearch.displayName = 'SelectSearch';

export { SelectSearch };
