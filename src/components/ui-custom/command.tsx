import { forwardRef, ReactElement, ReactNode } from 'react';
import { Icon } from './icon';
import {
  BaseCommand,
  BaseCommandEmpty,
  BaseCommandGroup,
  BaseCommandInput,
  BaseCommandItem,
  BaseCommandList,
  BaseCommandShortcut,
} from '@/components/ui';
import { cn } from '@/lib/utils';

type CommandItemProps = {
  /** Chave única do item. */
  key: React.Key;

  /** Ícone opcional exibido antes do rótulo. */
  icon?: ReactNode;

  /** Rótulo do item. */
  label: ReactNode;

  /** Atalho de teclado opcional. */
  shortcut?: ReactNode;

  /** Flag para desabilitar o item. */
  disabled?: boolean;

  /** Função de callback ao clicar no item. */
  onClick?: () => void;
};

type CommanGroupProps = {
  /** Chave única da seção. */
  key: React.Key;

  /** Título da seção opcional. */
  heading?: ReactNode;

  /** Itens da seção. */
  items?: CommandItemProps[];
};

type CommandProps = React.ComponentProps<typeof BaseCommand> & {
  /** Texto de placeholder para o campo de busca. */
  searchPlaceholder?: string;

  /** Opções de comando a serem exibidas. */
  items: CommanGroupProps[];

  /** Callback para mudanças no valor da busca. */
  onValueChange?: (value: string) => void;

  /** Callback para a execução da busca. */
  onSearch?: (search: string) => void;

  /** Flag para desabilitar o componente. */
  disabled?: boolean;

  /** Flag para indicar carregamento em curso. */
  loading?: boolean;

  /** Flag para filtrar automaticamente os itens. */
  shouldFilter?: boolean;

  /** Texto exibido quando não há dados. */
  emptyText?: string;

  /** Classe personalizada para a lista de comandos. */
  commandListClassName?: string;
};

/**
 * Componente de comando personalizado, usado para exibir e selecionar opções.
 *
 * @param {CommandProps}
 * @returns {ReactElement}
 */
const Command = forwardRef<React.ComponentRef<typeof BaseCommand>, CommandProps>(
  (
    {
      searchPlaceholder = 'Pesquisar...',
      disabled,
      items,
      onSearch,
      emptyText = 'Sem dados!',
      shouldFilter = true,
      commandListClassName,
      loading,
      ...props
    },
    ref,
  ): ReactElement => {
    const isDisabled = disabled || loading;
    const handleChangeInputSearch = (searchValue: string) => {
      if (disabled) return;
      onSearch?.(searchValue);
    };

    return (
      <BaseCommand {...props} ref={ref} shouldFilter={onSearch ? false : shouldFilter}>
        {shouldFilter && (
          <BaseCommandInput
            disabled={isDisabled}
            onValueChange={handleChangeInputSearch}
            placeholder={searchPlaceholder}
          />
        )}

        <BaseCommandList className={cn('relative', commandListClassName)}>
          {loading && (
            <div className="absolute inset-0 w-full h-full z-50 backdrop-blur-sm flex items-center justify-center">
              <Icon name="LoaderCircle" size={18} className="animate-spin h-8 w-8" />
            </div>
          )}
          <BaseCommandEmpty className="flex-1  flex flex-col gap-1 items-center justify-center text-muted-foreground p-2">
            <Icon name="PackageOpen" className="h-8 w-8" /> {emptyText}
          </BaseCommandEmpty>
          {items.map((groupItem) => (
            <BaseCommandGroup heading={groupItem?.heading} key={groupItem.key}>
              {groupItem?.items?.map((item) => (
                <BaseCommandItem
                  key={item.key}
                  disabled={isDisabled || item.disabled}
                  onSelect={item.onClick}
                  className="cursor-pointer"
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item?.label}
                  {item.shortcut && <BaseCommandShortcut>{item.shortcut}</BaseCommandShortcut>}
                </BaseCommandItem>
              ))}
            </BaseCommandGroup>
          ))}
        </BaseCommandList>
      </BaseCommand>
    );
  },
);

Command.displayName = 'Command';

export { Command };
export type { CommandItemProps, CommanGroupProps };
