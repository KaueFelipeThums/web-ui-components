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
  Badge,
  Separator,
} from '@/components/ui';
import { cn } from '@/lib/utils';

export type SelectMultipleProps = {
  /** Texto exibido quando nenhum item está selecionado. */
  placeholder?: string;

  /** Classe CSS personalizada. */
  className?: string;

  /** Valores selecionados. */
  value?: string[] | null;

  /** Texto exibido no campo de pesquisa. */
  placeholderSearch?: string;

  /** Título mostrado acima das opções de seleção. */
  heading?: string;

  /** Indica se o componente está desabilitado. */
  disabled?: boolean;

  /** Texto exibido quando não há itens na lista de opções. */
  emptyText?: string;

  /** Habilita ou desabilita a opção de "Marcar Todos". */
  showCheckAll?: boolean;

  /** Lista de opções para seleção. */
  options?: SelectOptionsProps[];

  /** Função chamada ao alterar os valores selecionados. */
  onValueChange?: (value: string[]) => void;

  /** Função chamada ao realizar a busca nos itens. */
  onSearch?: (value: string) => void;

  /** Status do campo, pode ser 'error', 'warning' ou 'default'. */
  status?: 'error' | 'warning' | 'default' | undefined;

  /** Indica se o componente está carregando. */
  loading?: boolean;
};

/**
 * Componente de select multiple personalizado.
 *
 * @param {SelectMultipleProps}
 * @returns {ReactElement}
 */
const SelectMultiple = ({
  placeholder,
  options = [],
  className,
  placeholderSearch = 'Pesquisar...',
  value,
  onValueChange,
  showCheckAll = true,
  onSearch,
  heading,
  disabled,
  emptyText = 'Sem dados!',
  loading,
  status,
}: SelectMultipleProps): ReactElement => {
  const [open, setOpen] = useState<boolean>(false);
  const selectedItemRef = useRef<HTMLDivElement | null>(null);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const isControlled = value !== undefined;
  const currentValue = (isControlled ? value : selectedValues) ?? [];

  const handleChangeInputSearch = useCallback(
    (searchValue: string) => {
      onSearch?.(searchValue);
    },
    [onSearch],
  );

  const handleSelectItem = useCallback(
    (selectedItemValue: string) => {
      const selectedItemValues = currentValue.includes(selectedItemValue)
        ? currentValue.filter((v) => v !== selectedItemValue)
        : [...currentValue, selectedItemValue];
      if (!isControlled) setSelectedValues(selectedItemValues);
      onValueChange?.(selectedItemValues);
    },
    [currentValue, isControlled, onValueChange],
  );

  const removeItem = useCallback(
    (itemValue: string): void => {
      const selectedItemValues = currentValue.filter((v) => v !== itemValue);
      if (!isControlled) setSelectedValues(selectedItemValues);
      onValueChange?.(selectedItemValues);
    },
    [onValueChange, isControlled, currentValue],
  );

  const handleFilter = useCallback(
    (value: string, search: string): number => {
      if (value === 'select-all') return 1;
      const item = options.find((option) => option.value === value);
      return item?.label?.toLowerCase().includes(search?.toLowerCase()) ? 1 : 0;
    },
    [options],
  );

  const onOpenChange = (dropDownMenuOpen: boolean) => {
    setOpen(dropDownMenuOpen);
    if (dropDownMenuOpen) setTimeout(() => selectedItemRef.current?.scrollIntoView({ block: 'nearest' }), 0);
  };

  const clear = useCallback(() => {
    if (!isControlled) setSelectedValues([]);
    onValueChange?.([]);
  }, [onValueChange, isControlled]);

  const selectAll = useCallback(() => {
    if (currentValue.length === options.length) {
      if (!isControlled) setSelectedValues([]);
      onValueChange?.([]);
    } else {
      const allValues = options.map((option) => option.value);
      if (!isControlled) setSelectedValues(allValues);
      onValueChange?.(allValues);
    }
  }, [onValueChange, isControlled, currentValue, options]);

  return (
    <Popover open={open} onOpenChange={onOpenChange} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          className={cn(
            'justify-between px-3 h-auto min-h-10 w-full flex rounded-md border hover:bg-background focus:outline-none focus:ring-1 focus:ring-ring',
            status === 'error' ? 'border-destructive' : '',
            status === 'warning' ? 'border-orange-500' : '',
            className,
          )}
        >
          {currentValue.length > 0 ? (
            <div className="flex truncate flex-wrap gap-1">
              {currentValue?.slice(0, 3)?.map((val) => (
                <Badge key={val} variant="secondary" className="select-none truncate">
                  <span className="truncate font-semibold">{options.find((opt) => opt.value === val)?.label}</span>
                  <div
                    className="ml-2 outline-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (disabled) return;
                      removeItem(val);
                    }}
                  >
                    <Icon name="X" className="h-4 w-4" />
                  </div>
                </Badge>
              ))}
              {currentValue.length > 3 && (
                <Badge variant="outline" className="select-none truncate">
                  <span className="truncate font-semibold">+ {currentValue.length - 3} marcados</span>
                </Badge>
              )}
            </div>
          ) : (
            <span className="truncate">{placeholder}</span>
          )}

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
              {showCheckAll && (
                <CommandItem onSelect={selectAll} value="select-all" disabled={disabled}>
                  {currentValue.length === options.length ? (
                    <Icon name="Check" className="h-4 w-4 mr-2" />
                  ) : (
                    <div className="h-4 w-4 mr-2" />
                  )}
                  <span className="break-all flex-1 font-bold">Marcar todos</span>
                </CommandItem>
              )}

              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  ref={currentValue.includes(option.value) ? selectedItemRef : null}
                  value={option.value}
                  disabled={disabled || option.disabled}
                  onSelect={handleSelectItem}
                >
                  {currentValue.includes(option.value) ? (
                    <Icon name="Check" className="h-4 w-4 mr-2" />
                  ) : (
                    <div className="h-4 w-4 mr-2" />
                  )}
                  <span className="break-all flex-1">{option.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <Separator />
          <div className="flex flex-row gap-1 p-1">
            <Button
              variant="ghost"
              size="sm"
              disabled={disabled}
              className="flex-1 cursor-pointer justify-center"
              onClick={clear}
            >
              Limpar
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 cursor-pointer justify-center"
              onClick={() => onOpenChange(false)}
            >
              Fechar
            </Button>
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

SelectMultiple.displayName = 'SelectMultiple';

export { SelectMultiple };
