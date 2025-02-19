import React, { ReactElement, ReactNode } from 'react';
import {
  BaseSheet,
  BaseSheetContent,
  BaseSheetDescription,
  BaseSheetFooter,
  BaseSheetHeader,
  BaseSheetTitle,
  BaseSheetTrigger,
  Separator,
} from '@/components/ui';
import { cn } from '@/lib/utils';

type SheetProps = React.ComponentProps<typeof BaseSheet> & {
  /** Função para lidar com a abertura/fechamento do sheet. */
  onOpenChange?: (open: boolean) => void;

  /** Estado de abertura do sheet. */
  open?: boolean;

  /** Estado inicial de abertura do sheet. */
  defaultOpen?: boolean;

  /** Título do sheet. */
  title: ReactNode;

  /** Descrição opcional exibida abaixo do título. */
  description?: ReactNode;

  /** Rodapé opcional para o sheet. */
  footer?: ReactNode;

  /** Conteúdo principal do sheet. */
  children?: ReactNode;

  /** Nome da classe CSS personalizada. */
  className?: string;

  /** Classe CSS adicional para personalização do conteúdo. */
  contentClassName?: string;

  /** Classe CSS adicional para personalização do cabeçalho. */
  headerClassName?: string;

  /** Classe CSS adicional para personalização do rodapé. */
  footerClassName?: string;

  /** Trigger para abrir o sheet. */
  trigger?: ReactNode;

  /** Exibe ou não o botão de fechar no rodapé. */
  showCloseButton?: boolean;

  /** Posição do sheet: 'top', 'bottom', 'left', 'right'. */
  side?: 'top' | 'bottom' | 'left' | 'right' | null | undefined;
};

/**
 * Componente de sheet customizado.
 *
 * @param {SheetProps}
 * @returns {ReactElement}
 */
const Sheet = ({
  title,
  description,
  footer,
  children,
  className,
  contentClassName,
  headerClassName,
  footerClassName,
  trigger,
  side,
  ...props
}: SheetProps): ReactElement => {
  return (
    <BaseSheet {...props}>
      {trigger && <BaseSheetTrigger asChild>{trigger}</BaseSheetTrigger>}
      <BaseSheetContent side={side} className={cn('!max-w-full flex flex-col p-0 gap-0 w-auto', className)}>
        <BaseSheetHeader className={cn('px-6 py-4', headerClassName)}>
          <BaseSheetTitle>{title}</BaseSheetTitle>
          <BaseSheetDescription>{description}</BaseSheetDescription>
        </BaseSheetHeader>
        <Separator />
        <div className={cn('px-6 py-4 flex-1 overflow-y-auto overflow-x-hidden', contentClassName)}>{children}</div>
        {footer && (
          <>
            <Separator />
            <BaseSheetFooter className={cn('px-6 py-4', footerClassName)}>{footer}</BaseSheetFooter>
          </>
        )}
      </BaseSheetContent>
    </BaseSheet>
  );
};

Sheet.displayName = 'Sheet';

export { Sheet };
