import React, { ReactElement, ReactNode } from 'react';
import {
  BaseDialog,
  BaseDialogContent,
  BaseDialogDescription,
  BaseDialogFooter,
  BaseDialogHeader,
  BaseDialogTitle,
  BaseDialogTrigger,
} from '@/components/ui';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

type DialogProps = React.ComponentProps<typeof BaseDialog> & {
  /** Título do diálogo. */
  title: ReactNode;

  /** Descrição opcional do diálogo. */
  description?: ReactNode;

  /** Rodapé do diálogo. */
  footer?: ReactNode;

  /** Conteúdo principal do diálogo. */
  children?: ReactNode;

  /** Classe CSS adicional para personalização do componente. */
  className?: string;

  /** Classe CSS adicional para personalização do conteúdo do diálogo. */
  contentClassName?: string;

  /** Classe CSS adicional para personalização do cabeçalho do diálogo. */
  headerClassName?: string;

  /** Classe CSS adicional para personalização do rodapé do diálogo. */
  footerClassName?: string;

  /** Elemento disparador do diálogo. */
  trigger?: ReactNode;
};

/**
 * Componente de diálogo personalizado, usado para exibir e controlar conteúdo em uma janela modal.
 *
 * @param {CustomDialogProps}
 * @returns {ReactElement}
 */
const Dialog = ({
  title,
  description,
  footer,
  children,
  className,
  contentClassName,
  headerClassName,
  footerClassName,
  trigger,
  ...props
}: DialogProps): ReactElement => {
  const handleInteractOutside = (e: any) => {
    const { originalEvent } = e.detail;
    if (originalEvent.target instanceof Element && originalEvent.target.closest('.group.toast')) {
      e.preventDefault();
    }
  };

  return (
    <BaseDialog {...props}>
      {trigger && <BaseDialogTrigger asChild>{trigger}</BaseDialogTrigger>}
      <BaseDialogContent
        className={cn('max-w-full flex flex-col p-0 gap-0 w-[800px] max-h-full', className)}
        onInteractOutside={handleInteractOutside}
      >
        <BaseDialogHeader className={cn('px-6 py-4', headerClassName)}>
          <BaseDialogTitle>{title}</BaseDialogTitle>
          <BaseDialogDescription>{description}</BaseDialogDescription>
        </BaseDialogHeader>
        <Separator />
        <div className={cn('px-6 py-4 flex-1 overflow-y-auto overflow-x-hidden', contentClassName)}>{children}</div>
        {footer && (
          <>
            <Separator />
            <BaseDialogFooter className={cn('px-6 py-4', footerClassName)}>{footer}</BaseDialogFooter>
          </>
        )}
      </BaseDialogContent>
    </BaseDialog>
  );
};

export { Dialog };
