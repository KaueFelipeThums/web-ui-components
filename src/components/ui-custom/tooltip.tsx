import React, { ReactElement, ReactNode } from 'react';
import { BaseTooltip, BaseTooltipContent, BaseTooltipTrigger } from '@/components/ui';

type TooltipProps = React.ComponentProps<typeof BaseTooltip> & {
  /** Conteúdo que será exibido dentro do tooltip. */
  content?: ReactNode;

  /** Classe CSS personalizada para o conteúdo do tooltip. */
  contentClassName?: string;

  /** Elemento filho que será exibido como gatilho para o tooltip. */
  children?: ReactNode;
};

/**
 * Componente de tooltip personalizado.
 *
 * @param {TooltipProps}
 * @returns {ReactElement}
 */
const Tooltip = ({ children, content, contentClassName, ...props }: TooltipProps): ReactElement => {
  return (
    <BaseTooltip {...props}>
      <BaseTooltipTrigger asChild>{children}</BaseTooltipTrigger>
      <BaseTooltipContent className={contentClassName}>{content}</BaseTooltipContent>
    </BaseTooltip>
  );
};

Tooltip.displayName = 'Tooltip';

export { Tooltip };
