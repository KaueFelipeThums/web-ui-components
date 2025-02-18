import React, { forwardRef, ReactElement, ReactNode } from 'react';
import {
  BaseMenubar,
  BaseMenubarMenu,
  BaseMenubarTrigger,
  BaseMenubarContent,
  BaseMenubarItem,
  BaseMenubarSeparator,
  BaseMenubarSub,
  BaseMenubarSubTrigger,
  BaseMenubarSubContent,
  BaseMenubarShortcut,
} from '@/components/ui';

type MenubarItemProps = {
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
  children?: MenubarItemProps[];

  /** Função de callback ao clicar no item. */
  onClick?: () => void;
};

type MenubarMenuProps = {
  /** Label do grupo */
  label: React.ReactNode;

  /** Itens do grupo */
  items: MenubarItemProps[];
};

type MenuBarProps = React.ComponentProps<typeof BaseMenubar> & {
  /** Itens do menu */
  menu: MenubarMenuProps[];
};

const MenubarItemRender = ({ item }: { item: MenubarItemProps }) => {
  if (item.type === 'separator') {
    return <BaseMenubarSeparator />;
  }

  if (item.children && item.children.length > 0) {
    return (
      <BaseMenubarSub key={item.key}>
        <BaseMenubarSubTrigger>
          {item.icon && <span className="mr-2">{item.icon}</span>}
          {item.label}
        </BaseMenubarSubTrigger>
        <BaseMenubarSubContent>
          {item.children.map((subitem) => (
            <MenubarItemRender key={subitem.key} item={subitem} />
          ))}
        </BaseMenubarSubContent>
      </BaseMenubarSub>
    );
  }

  return (
    <BaseMenubarItem onSelect={item.onClick} key={item.key} disabled={item.disabled}>
      {item.icon && <span className="mr-2">{item.icon}</span>}
      {item.label}
      {item.shortcut && <BaseMenubarShortcut>{item.shortcut}</BaseMenubarShortcut>}
    </BaseMenubarItem>
  );
};

/**
 * Componente de Menubar personalizado.
 *
 * @param {MenuBarProps}
 * @returns {ReactElement}
 */
const Menubar = forwardRef<React.ComponentRef<typeof BaseMenubar>, MenuBarProps>(
  ({ menu, ...props }, ref): ReactElement => {
    return (
      <BaseMenubar ref={ref} {...props}>
        {menu.map((groupItem, index) => (
          <BaseMenubarMenu key={index}>
            <BaseMenubarTrigger>{groupItem.label}</BaseMenubarTrigger>
            <BaseMenubarContent>
              {groupItem.items.map((item) => (
                <MenubarItemRender key={item.key} item={item} />
              ))}
            </BaseMenubarContent>
          </BaseMenubarMenu>
        ))}
      </BaseMenubar>
    );
  },
);

Menubar.displayName = 'Menubar';

export { Menubar, type MenubarItemProps, type MenubarMenuProps };
