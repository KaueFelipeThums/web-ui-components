import React, { forwardRef, ReactElement, ReactNode } from 'react';
import { BaseAccordion, BaseAccordionItem, BaseAccordionTrigger, BaseAccordionContent } from '@/components/ui';

type AccordionItemProps = {
  /** Valor único da aba. */
  value: string;

  /** Título da aba, podendo ser um conteúdo ReactNode. */
  title: ReactNode;

  /** Conteúdo da aba, podendo ser um conteúdo ReactNode. */
  content: ReactNode;

  /** Indica se a aba está desabilitada. O padrão é false. */
  disabled?: boolean;
};

type AccordionProps = React.ComponentProps<typeof BaseAccordion> & {
  /** Dados para população das abas. */
  data: AccordionItemProps[];

  /** Classe personalizada para o item da aba. */
  itemClassName?: string;
};

/**
 * Componente de Accordion personalizado que exibe uma lista de itens com títulos e descrições,
 * permitindo a exibição e controle de conteúdo colapsável.
 *
 * @param {AccordionProps}
 * @returns {ReactElement}
 */
const Accordion = forwardRef<React.ComponentRef<typeof BaseAccordion>, AccordionProps>(
  ({ data, itemClassName, ...props }, ref): ReactElement => {
    return (
      <BaseAccordion {...props} ref={ref}>
        {data.map((item) => (
          <BaseAccordionItem key={item.value} value={item.value} disabled={item.disabled} className={itemClassName}>
            <BaseAccordionTrigger>{item.title}</BaseAccordionTrigger>
            <BaseAccordionContent>{item.content}</BaseAccordionContent>
          </BaseAccordionItem>
        ))}
      </BaseAccordion>
    );
  },
);

Accordion.displayName = 'Accordion';

export { Accordion, type AccordionItemProps };
