import React, { ReactElement, ReactNode } from 'react';
import {
  BaseContextMenu,
  BaseContextMenuContent,
  BaseContextMenuGroup,
  BaseContextMenuItem,
  BaseContextMenuLabel,
  BaseContextMenuPortal,
  BaseContextMenuSeparator,
  BaseContextMenuShortcut,
  BaseContextMenuSub,
  BaseContextMenuSubContent,
  BaseContextMenuSubTrigger,
  BaseContextMenuTrigger,
} from '@/components/ui';
import { cn } from '@/lib/utils';

type ContextMenuItemProps = {
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
  children?: ContextMenuItemProps[];

  /** Função de callback ao clicar no item. */
  onClick?: () => void;
};

type RenderMenuItemsProps = {
  /** Item a ser renderizado */
  item: ContextMenuItemProps;
};

/**
 * Função de renderização recursiva para itens de menu suspenso.
 *
 *
 * @param {RenderMenuItemsProps} props - Propriedades do item.
 * @returns {ReactElement} Elemento JSX do item renderizado.
 */
const ContextMenuItemRender = ({ item }: RenderMenuItemsProps): ReactElement => {
  if (item.type === 'separator') {
    return (
      <>
        {item.label && <BaseContextMenuLabel>{item.label}</BaseContextMenuLabel>}
        <BaseContextMenuSeparator />
      </>
    );
  }

  if (item.children && item.children.length > 0) {
    return (
      <BaseContextMenuSub key={item.key}>
        <BaseContextMenuSubTrigger>
          {item.icon && <span className="mr-2">{item.icon}</span>}
          {item.label}
        </BaseContextMenuSubTrigger>
        <BaseContextMenuPortal>
          <BaseContextMenuSubContent>
            {item.children.map((subitem) => (
              <ContextMenuItemRender key={subitem.key} item={subitem} />
            ))}
          </BaseContextMenuSubContent>
        </BaseContextMenuPortal>
      </BaseContextMenuSub>
    );
  }

  return (
    <BaseContextMenuItem onSelect={item.onClick} key={item.key} disabled={item.disabled}>
      {item.icon && <span className="mr-2">{item.icon}</span>}
      {item.label}
      {item.shortcut && <BaseContextMenuShortcut>{item.shortcut}</BaseContextMenuShortcut>}
    </BaseContextMenuItem>
  );
};

type ContextMenuProps = React.ComponentProps<typeof BaseContextMenu> & {
  /** Itens do menu suspenso. */
  items: ContextMenuItemProps[];

  /** Classe personalizada para o conteúdo do menu. */
  contentClassName?: string;

  /** Classe personalizada para o grupo do menu. */
  groupClassName?: string;
};

/**
 * Componente CustomContextMenu para criar menus suspensos customizáveis.
 *
 * @param {ContextMenuProps}
 * @returns {ReactElement}
 */
const ContextMenu = ({
  items,
  children,
  contentClassName,
  groupClassName,
  ...props
}: ContextMenuProps): ReactElement => {
  return (
    <BaseContextMenu {...props}>
      <BaseContextMenuTrigger asChild>{children}</BaseContextMenuTrigger>
      <BaseContextMenuContent className={cn('min-w-36', contentClassName)}>
        <BaseContextMenuGroup className={groupClassName}>
          {items.map((item) => (
            <ContextMenuItemRender key={item.key} item={item} />
          ))}
        </BaseContextMenuGroup>
      </BaseContextMenuContent>
    </BaseContextMenu>
  );
};

ContextMenu.displayName = 'ContextMenu';

export { ContextMenu, type ContextMenuItemProps };
