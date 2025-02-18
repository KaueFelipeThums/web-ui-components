import React, { ReactElement, ReactNode } from 'react';
import {
  BaseDropdownMenu,
  BaseDropdownMenuContent,
  BaseDropdownMenuGroup,
  BaseDropdownMenuItem,
  BaseDropdownMenuLabel,
  BaseDropdownMenuPortal,
  BaseDropdownMenuSeparator,
  BaseDropdownMenuShortcut,
  BaseDropdownMenuSub,
  BaseDropdownMenuSubContent,
  BaseDropdownMenuSubTrigger,
  BaseDropdownMenuTrigger,
} from '@/components/ui';
import { cn } from '@/lib/utils';

type DropdownMenuItemProps = {
  /** Chave única para o item. */
  key: React.Key;

  /** Tipo do item: "item" para itens normais, "separator" para separadores. */
  type?: 'item' | 'separator';

  /** Ícone opcional para o item. */
  icon?: ReactNode;

  /** Rótulo do item. */
  label?: ReactNode;

  /** Atalho opcional associado ao item. */
  shortcut?: ReactNode;

  /** Indica se o item está desabilitado. */
  disabled?: boolean;

  /** Subitens, caso o item tenha subitens. */
  children?: DropdownMenuItemProps[];

  /** Função de callback ao clicar no item. */
  onClick?: () => void;
};

type RenderMenuItemsProps = {
  /** Item a ser renderizado */
  item: DropdownMenuItemProps;
};

/**
 * Função de renderização recursiva para itens de menu suspenso.
 *
 *
 * @param {RenderMenuItemsProps} props - Propriedades do item.
 * @returns {ReactElement} Elemento JSX do item renderizado.
 */
const DropDownMenuItemRender = ({ item }: RenderMenuItemsProps): ReactElement => {
  if (item.type === 'separator') {
    return (
      <>
        {item.label && <BaseDropdownMenuLabel>{item.label}</BaseDropdownMenuLabel>}
        <BaseDropdownMenuSeparator />
      </>
    );
  }

  if (item.children && item.children.length > 0) {
    return (
      <BaseDropdownMenuSub key={item.key}>
        <BaseDropdownMenuSubTrigger>
          {item.icon && <span className="mr-2">{item.icon}</span>}
          {item.label}
        </BaseDropdownMenuSubTrigger>
        <BaseDropdownMenuPortal>
          <BaseDropdownMenuSubContent>
            {item.children.map((subitem) => (
              <DropDownMenuItemRender key={subitem.key} item={subitem} />
            ))}
          </BaseDropdownMenuSubContent>
        </BaseDropdownMenuPortal>
      </BaseDropdownMenuSub>
    );
  }

  return (
    <BaseDropdownMenuItem onSelect={item.onClick} key={item.key} disabled={item.disabled}>
      {item.icon && <span className="mr-2">{item.icon}</span>}
      {item.label}
      {item.shortcut && <BaseDropdownMenuShortcut>{item.shortcut}</BaseDropdownMenuShortcut>}
    </BaseDropdownMenuItem>
  );
};

type DropdownMenuProps = React.ComponentProps<typeof BaseDropdownMenu> & {
  /** Itens do menu suspenso. */
  items: DropdownMenuItemProps[];

  /** Classe personalizada para o conteúdo do menu. */
  contentClassName?: string;

  /** Classe personalizada para o grupo do menu. */
  groupClassName?: string;
};

/**
 * Componente CustomDropdownMenu para criar menus suspensos customizáveis.
 *
 * @param {DropdownMenuProps}
 * @returns {ReactElement}
 */
const DropdownMenu = ({
  items,
  children,
  contentClassName,
  groupClassName,
  ...props
}: DropdownMenuProps): ReactElement => {
  return (
    <BaseDropdownMenu {...props}>
      <BaseDropdownMenuTrigger asChild>{children}</BaseDropdownMenuTrigger>
      <BaseDropdownMenuContent className={cn('min-w-36', contentClassName)}>
        <BaseDropdownMenuGroup className={groupClassName}>
          {items.map((item) => (
            <DropDownMenuItemRender key={item.key} item={item} />
          ))}
        </BaseDropdownMenuGroup>
      </BaseDropdownMenuContent>
    </BaseDropdownMenu>
  );
};

DropdownMenu.displayName = 'DropdownMenu';

export { DropdownMenu, type DropdownMenuItemProps };
