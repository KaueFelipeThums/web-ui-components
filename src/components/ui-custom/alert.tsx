import { forwardRef, ReactElement, ReactNode } from 'react';
import { Icon, IconName } from './icon';
import { BaseAlert, BaseAlertTitle, BaseAlertDescription } from '@/components/ui';
import { cn } from '@/lib/utils';

type AlertProps = React.ComponentProps<typeof BaseAlert> & {
  /** Título do alerta. */
  title: ReactNode;

  /** Descrição adicional do alerta. */
  description?: ReactNode;

  /** Classe personalizada para o título do alerta. */
  titleClassName?: string;

  /** Classe personalizada para a descrição do alerta. */
  descriptionClassName?: string;

  /** Classe personalizada para o ícone do alerta. */
  iconClassName?: string;

  /** Nome do ícone a ser exibido no alerta. */
  icon?: IconName;
};

/**
 * Componente de alerta personalizado, usado para exibir mensagens com diferentes níveis de severidade.
 *
 * @param {AlertProps}
 * @returns {ReactElement}
 */
const Alert = forwardRef<React.ComponentRef<typeof BaseAlert>, AlertProps>(
  ({ title, description, titleClassName, iconClassName, descriptionClassName, icon, ...props }, ref): ReactElement => {
    return (
      <BaseAlert {...props} ref={ref}>
        {icon && <Icon name={icon} className={cn('h-4 w-4', iconClassName)} />}
        <BaseAlertTitle className={titleClassName}>{title}</BaseAlertTitle>
        {description && <BaseAlertDescription className={descriptionClassName}>{description}</BaseAlertDescription>}
      </BaseAlert>
    );
  },
);

Alert.displayName = 'Alert';

export { Alert };
