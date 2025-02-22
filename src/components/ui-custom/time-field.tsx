import { AriaTimeFieldProps, TimeValue, useTimeField } from '@react-aria/datepicker';
import { useTimeFieldState } from '@react-stately/datepicker';
import { useRef } from 'react';
import { DateSegment } from './date-segment';
import { cn } from '@/lib/utils';

function TimeField(props: AriaTimeFieldProps<TimeValue> & { className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  const state = useTimeFieldState({
    ...props,
    locale: 'pt-BR',
    shouldForceLeadingZeros: true,
  });
  const {
    fieldProps: { ...fieldProps },
  } = useTimeField({ 'aria-label': 'Time Field', ...props }, state, ref);

  return (
    <div
      {...fieldProps}
      ref={ref}
      className={cn(
        'inline-flex h-10 flex-1 items-center bg-transparent',
        props.isDisabled ? 'cursor-not-allowed opacity-50' : '',
        state.isInvalid ? 'text-destructive' : '',
        props.className,
      )}
    >
      {state.segments.map((segment, i) => (
        <DateSegment key={i} segment={segment} state={state} />
      ))}
    </div>
  );
}

export { TimeField };
