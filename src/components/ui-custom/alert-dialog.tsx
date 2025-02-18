import { cva } from 'class-variance-authority';
import { ReactElement, ReactNode } from 'react';
import { Icon, IconName } from './icon';
import {
  BaseAlertDialog,
  BaseAlertDialogAction,
  BaseAlertDialogCancel,
  BaseAlertDialogContent,
  BaseAlertDialogDescription,
  BaseAlertDialogFooter,
  BaseAlertDialogHeader,
  BaseAlertDialogTitle,
  BaseAlertDialogTrigger,
} from '@/components/ui';
import { cn } from '@/lib/utils';

const alertDialogIconVariants = cva('h-7 w-7', {
  variants: {
    variant: {
      default: 'text-orange-500',
      destructive: 'text-destructive',
      success: 'text-green-500',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type IconVariants = 'default' | 'destructive' | 'success';

const iconNameVariants: Record<IconVariants, IconName> = {
  default: 'TriangleAlert',
  destructive: 'CircleX',
  success: 'CircleCheck',
};

type AlertDialogProps = React.ComponentProps<typeof BaseAlertDialog> & {
  /** Título do diálogo. */
  title: ReactNode;

  /** Descrição adicional do diálogo.*/
  description?: ReactNode;

  /** Variante do diálogo. */
  variant?: IconVariants;

  /** Classe CSS adicional para personalização.*/
  className?: string;

  /** Classe CSS adicional para personalização do cabeçalho.*/
  headerClassName?: string;

  /** Classe CSS adicional para personalização do título.*/
  titleClassName?: string;

  /** Classe CSS adicional para personalização da descrição.*/
  descriptionClassName?: string;

  /** Classe CSS adicional para personalização do rodape.*/
  footerClassName?: string;

  /** Classe CSS adicional para personalização do botão de cancelamento. */
  cancelClassName?: string;

  /** Classe CSS adicional para personalização do botão de confirmação. */
  actionClassName?: string;

  /** Função personalizada para renderizar o icone. */
  renderIcon?: ReactElement;

  /** Componentes ou elementos filhos que o CustomAlertDialog pode conter. */
  children?: ReactNode;

  /** Texto do botão de cancelamento. Padrão: 'Cancelar'. */
  cancelText?: ReactNode;

  /** Texto do botão de confirmação. Padrão: 'Sim'.*/
  confirmText?: ReactNode;

  /** Indica se o botão e as ações estão desabilitados. Padrão: false.*/
  disabled?: boolean;

  /** Função chamada quando o botão de cancelamento é clicado. */
  onCancel?: () => void;

  /** Função chamada quando o botão de confirmação é clicado. */
  onConfirm?: () => void;

  /** Define se o botão de cancelamento deve ser escondido. */
  hideCancelButton?: boolean;
};

/**
 * Componente de diálogo de alerta personalizado, usado para exibir mensagens de confirmação ou cancelamento.
 *
 * @param {AlertDialogProps}
 * @returns {ReactElement}
 */
const AlertDialog = ({
  title,
  description,
  variant = 'default',
  className,
  headerClassName,
  titleClassName,
  descriptionClassName,
  footerClassName,
  cancelClassName,
  actionClassName,
  children,
  renderIcon,
  cancelText = 'Cancelar',
  confirmText = 'Sim',
  disabled = false,
  onCancel,
  onConfirm,
  hideCancelButton = false,
  ...props
}: AlertDialogProps): ReactElement => {
  return (
    <BaseAlertDialog {...props}>
      <BaseAlertDialogTrigger asChild>{children}</BaseAlertDialogTrigger>
      <BaseAlertDialogContent className={className}>
        <BaseAlertDialogHeader className={cn('flex flex-row gap-4 items-center space-y-0', headerClassName)}>
          {renderIcon ?? <Icon name={iconNameVariants[variant]} className={alertDialogIconVariants({ variant })} />}
          <div className="space-y-2">
            <BaseAlertDialogTitle className={titleClassName}>{title}</BaseAlertDialogTitle>
            <BaseAlertDialogDescription className={descriptionClassName}>
              {description ?? `Pressione "${confirmText}" para confirmar`}
            </BaseAlertDialogDescription>
          </div>
        </BaseAlertDialogHeader>
        <BaseAlertDialogFooter className={footerClassName}>
          {!hideCancelButton && (
            <BaseAlertDialogCancel onClick={onCancel} disabled={disabled} className={cancelClassName}>
              {cancelText}
            </BaseAlertDialogCancel>
          )}

          <BaseAlertDialogAction onClick={onConfirm} disabled={disabled} className={actionClassName}>
            {confirmText}
          </BaseAlertDialogAction>
        </BaseAlertDialogFooter>
      </BaseAlertDialogContent>
    </BaseAlertDialog>
  );
};

AlertDialog.displayName = 'AlertDialog';

export { AlertDialog };
