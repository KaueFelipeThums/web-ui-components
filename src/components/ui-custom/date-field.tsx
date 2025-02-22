import { createCalendar } from '@internationalized/date';
import { AriaDatePickerProps, DateValue, useDateField } from '@react-aria/datepicker';
import { useDateFieldState } from '@react-stately/datepicker';
import { useRef } from 'react';
import { DateSegment } from './date-segment';
import { cn } from '@/lib/utils';

const DateField = (props: AriaDatePickerProps<DateValue>) => {
  const ref = useRef(null);

  const state = useDateFieldState({
    ...props,
    locale: 'pt-BR',
    createCalendar,
  });
  const { fieldProps } = useDateField(
    {
      'aria-label': 'Date Field',
      ...props,
    },
    state,
    ref,
  );

  return (
    <div
      {...fieldProps}
      ref={ref}
      className={cn(
        'inline-flex h-10 flex-1 items-center bg-transparent',
        props.isDisabled ? 'cursor-not-allowed opacity-50' : '',
        state.isInvalid ? 'text-destructive' : '',
      )}
    >
      {state.segments.map((segment, i) => (
        <DateSegment key={i} segment={segment} state={state} />
      ))}
    </div>
  );
};

export { DateField };
