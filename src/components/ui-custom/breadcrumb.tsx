import React, { forwardRef, ReactElement } from 'react';
import { ReactNode } from 'react';
import {
  BaseBreadcrumb,
  BaseBreadcrumbEllipsis,
  BaseBreadcrumbItem,
  BaseBreadcrumbLink,
  BaseBreadcrumbList,
  BaseBreadcrumbPage,
  BaseBreadcrumbSeparator,
} from '@/components/ui';
import {
  BaseDropdownMenu,
  BaseDropdownMenuContent,
  BaseDropdownMenuItem,
  BaseDropdownMenuTrigger,
} from '@/components/ui';

type BreadcrumbItemProps = {
  /** Identificador único da breadcrumb item. */
  key: string;

  /** Rótulo da breadcrumb item. */
  label?: ReactNode;

  /** Função chamada quando a breadcrumb item é clicada. */
  onClick?: () => void;

  /** Indica se a breadcrumb item representa uma página. */
  isPage?: boolean;

  /** Itens filhos para breadcrumb, caso tenha um submenu. */
  children?: Omit<BreadcrumbItemProps, 'isPage'>[];
};

type BreadcrumbItemRenderProps = {
  /** Array de itens de breadcrumb */
  item: BreadcrumbItemProps;

  /** Indica se o item atual é o ultimo da lista. */
  isLastItem: boolean;
};

/**
 * Componente de item de breadcrumb customizado.
 *
 * @param {BreadcrumbItemRenderProps}
 * @returns {RenderMenuItemsProps}
 */
const BreadcrumbItemRenderer = ({ item, isLastItem }: BreadcrumbItemRenderProps): ReactElement => {
  if (item.children && item.children.length > 0) {
    return (
      <>
        <BaseBreadcrumbItem>
          <BaseDropdownMenu>
            <BaseDropdownMenuTrigger className="flex items-center gap-1">
              <BaseBreadcrumbEllipsis className="h-4 w-4" />
            </BaseDropdownMenuTrigger>
            <BaseDropdownMenuContent align="start">
              {item.children.map((subitem) => (
                <BaseDropdownMenuItem key={subitem.key}>
                  {item.onClick ? (
                    <BaseBreadcrumbLink className="cursor-pointer" onClick={subitem.onClick}>
                      {subitem.label}
                    </BaseBreadcrumbLink>
                  ) : (
                    subitem.label
                  )}
                </BaseDropdownMenuItem>
              ))}
            </BaseDropdownMenuContent>
          </BaseDropdownMenu>
        </BaseBreadcrumbItem>
        {!isLastItem && <BaseBreadcrumbSeparator />}
      </>
    );
  }

  return (
    <>
      <BaseBreadcrumbItem>
        {item.onClick ? (
          <BaseBreadcrumbLink className="cursor-pointer" onClick={item.onClick}>
            {item.label}
          </BaseBreadcrumbLink>
        ) : item.isPage ? (
          <BaseBreadcrumbPage>{item.label}</BaseBreadcrumbPage>
        ) : (
          item.label
        )}
      </BaseBreadcrumbItem>
      {!isLastItem && <BaseBreadcrumbSeparator />}
    </>
  );
};

type BreadcrumbProps = React.ComponentProps<typeof BaseBreadcrumb> & {
  /** Lista de itens de breadcrumb. */
  items: BreadcrumbItemProps[];

  /** Classe personalizada para a lista de itens de breadcrumb. */
  listClassName?: string;
};

/**
 * Componente de breadcrumb customizado que exibe uma navegação em hierarquia.
 *
 * @param {BreadcrumbProps}
 * @returns {ReactElement}
 */
const Breadcrumb = forwardRef<React.ComponentRef<typeof BaseBreadcrumb>, BreadcrumbProps>(
  ({ items, listClassName, ...props }, ref): ReactElement => {
    return (
      <BaseBreadcrumb ref={ref} {...props}>
        <BaseBreadcrumbList className={listClassName}>
          {items.map((item, index) => (
            <BreadcrumbItemRenderer key={item.key} item={item} isLastItem={index === items.length - 1} />
          ))}
        </BaseBreadcrumbList>
      </BaseBreadcrumb>
    );
  },
);

Breadcrumb.displayName = 'Breadcrumb';

export { Breadcrumb, type BreadcrumbItemProps };
