import React, { ReactElement, ReactNode } from 'react';
import { BaseHoverCard, BaseHoverCardContent, BaseHoverCardTrigger } from '@/components/ui';

type HoverCardProps = React.ComponentProps<typeof BaseHoverCard> & {
  /** Elementos React que serão renderizados como filho do HoverCard. */
  children?: ReactNode;

  /** Conteúdo que será exibido no HoverCard.*/
  content?: ReactNode;

  /** Classe CSS para customizar o conteúdo do HoverCard.*/
  contentClassName?: string;
};

/**
 * Componente HoverCard personalizado, usado para exibir e controlar conteúdo em uma janela hover.
 *
 * @param {HoverCardProps}
 * @returns {ReactElement}
 */
const HoverCard = ({ children, content, contentClassName, ...props }: HoverCardProps): ReactElement => {
  return (
    <BaseHoverCard {...props}>
      <BaseHoverCardTrigger asChild>{children}</BaseHoverCardTrigger>
      <BaseHoverCardContent className={contentClassName}>{content}</BaseHoverCardContent>
    </BaseHoverCard>
  );
};

HoverCard.displayName = 'HoverCard';

export { HoverCard };
