import { ptBR } from 'date-fns/locale';
import { ReactElement } from 'react';
import { BaseCalendar } from '@/components/ui';

/**
 * Componente de calendário personalizado, usado para exibir e selecionar datas.
 *
 * @param {React.ComponentProps<typeof BaseCalendar>}
 * @returns {JSX.Element}
 */
const Calendar = ({ locale = ptBR, ...props }: React.ComponentProps<typeof BaseCalendar>): ReactElement => {
  return <BaseCalendar {...props} locale={locale} />;
};

Calendar.displayName = 'Calendar';

export { Calendar };
