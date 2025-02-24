import { parseTime } from '@internationalized/date';
import { TimeValue } from '@react-aria/datepicker';
import { TimeFieldStateOptions } from '@react-stately/datepicker';
import { format, parse } from 'date-fns';
import { useCallback } from 'react';
import { Icon } from './icon';
import { TimeField } from './time-field';
import { cn } from '@/lib/utils';

type TimerPickerProps = Omit<
  TimeFieldStateOptions<TimeValue>,
  'value' | 'minValue' | 'maxValue' | 'onChange' | 'locale'
> & {
  disabled?: boolean;
  className?: string;
  value?: Date | null;
  minValue?: Date;
  maxValue?: Date;
  onChange?: (value: Date | null) => void;
};

const TimePicker = ({
  value,
  disabled,
  className,
  onChange,
  minValue,
  maxValue,
  hourCycle = 24,
  ...props
}: TimerPickerProps) => {
  const initialValue = value ? parseTime(format(value, 'HH:mm:ss')) : value;

  const handleChangeDate = useCallback(
    (dateValue: TimeValue | null) => {
      if (dateValue) {
        const newDate = parse(dateValue.toString(), 'HH:mm:ss', new Date());
        console.log(newDate);
        onChange?.(newDate);
      } else {
        onChange?.(null);
      }
    },
    [onChange, minValue, maxValue],
  );

  return (
    <div
      className={cn(
        'inline-flex items-center shadow-sm h-9 w-full flex-1 rounded-md border border-input bg-transparent px-3 py-1 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className,
        disabled ? 'cursor-not-allowed opacity-50' : '',
      )}
    >
      <TimeField
        minValue={minValue ? parseTime(format(minValue, 'HH:mm:ss')) : undefined}
        maxValue={maxValue ? parseTime(format(maxValue, 'HH:mm:ss')) : undefined}
        onChange={handleChangeDate}
        isDisabled={disabled}
        value={initialValue}
        hourCycle={hourCycle}
        {...props}
      />
      <div className={cn('size-6 flex items-center justify-center text-muted-foreground')}>
        <Icon name="Clock" className="h-4 w-4" />
      </div>
    </div>
  );
};

TimePicker.DisplayName = 'TimePicker';

export { TimePicker };
