import { parseDate, parseDateTime } from '@internationalized/date';
import { DateValue, useDatePicker } from '@react-aria/datepicker';
import { DatePickerStateOptions, useDatePickerState } from '@react-stately/datepicker';
import { format, isEqual, isValid } from 'date-fns';
import { ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button } from './button';
import { Calendar as DayPicker } from './calendar';
import { DateField } from './date-field';
import { Icon } from './icon';
import { SelectOptionsProps, Select } from './select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui';
import { cn } from '@/lib/utils';

/**
 * Gera opções de anos para o seletor de ano no componente CustomDateRangePicker.
 *
 * @param {Date} selectedDate - A data selecionada.
 * @param {number} [yearRange=10] - A faixa de anos a ser gerada.
 * @returns {SelectOptionsProps[]}
 */
const getYears = (selectedDate: Date, yearRange: number = 10): SelectOptionsProps[] => {
  const date = isValid(selectedDate) ? selectedDate : new Date();
  return Array.from({ length: yearRange * 2 + 1 }, (_, i) => {
    const year = date.getFullYear() - yearRange + i;
    if (year >= 1) {
      return { value: year.toString(), label: year.toString() };
    }
    return null;
  }).filter(Boolean) as SelectOptionsProps[];
};

/**
 * Opções de meses para o componente CustomDateRangePicker.
 */
const monthsOptions: SelectOptionsProps[] = [
  { value: '0', label: 'Janeiro' },
  { value: '1', label: 'Fevereiro' },
  { value: '2', label: 'Março' },
  { value: '3', label: 'Abril' },
  { value: '4', label: 'Maio' },
  { value: '5', label: 'Junho' },
  { value: '6', label: 'Julho' },
  { value: '7', label: 'Agosto' },
  { value: '8', label: 'Setembro' },
  { value: '9', label: 'Outubro' },
  { value: '10', label: 'Novembro' },
  { value: '11', label: 'Dezembro' },
];

type CalendarProps = {
  /** Callback acionado quando a data é alterada. */
  onChange: (date: Date) => void;

  /** A data atualmente selecionada. */
  value?: Date;

  /** A data mínima permitida no calendário. */
  minValue?: Date;

  /** A data máxima permitida no calendário. */
  maxvalue?: Date;

  /** Indica se o calendário está desabilitado. O padrão é false. */
  disabled?: boolean;

  /** O intervalo de anos exibido no seletor de ano. O padrão é 50. */
  yearRange?: number;
};

/**
 * Um componente de calendário que permite a seleção de datas,
 * incluindo opções de restrição por intervalo de datas e ano configurável.
 *
 * @param {CalendarProps}
 * @returns {ReactElement}
 */
const Calendar = ({
  onChange,
  value,
  minValue,
  maxvalue,
  disabled = false,
  yearRange = 50,
}: CalendarProps): ReactElement => {
  const [month, setMonth] = useState(value ?? new Date());
  const yearOptions = useMemo(() => getYears(month, yearRange), [month.getFullYear(), yearRange]);

  useEffect(() => {
    if (value && !isEqual(value, month)) setMonth(value);
  }, [value]);

  return (
    <div>
      <div className="px-3 pt-3 flex gap-2">
        <Select
          options={monthsOptions}
          disabled={disabled}
          value={month?.getMonth()?.toString()}
          onValueChange={(value) => {
            const newDate = new Date(month);
            newDate.setMonth(Number.parseInt(value, 10));
            setMonth?.(newDate);
          }}
        />
        <Select
          disabled={disabled}
          options={yearOptions}
          value={month?.getFullYear()?.toString()}
          onValueChange={(value) => {
            const newDate = new Date(month);
            newDate.setFullYear(Number.parseInt(value, 10));
            setMonth?.(newDate);
          }}
        />
      </div>
      <DayPicker
        mode="single"
        selected={value}
        onSelect={(value) => value && onChange(value)}
        month={month}
        onMonthChange={setMonth}
        disabled={(date) => (minValue && minValue > date) || (maxvalue && maxvalue < date) || disabled}
      />
    </div>
  );
};

type DatePickerProps = Omit<DatePickerStateOptions<DateValue>, 'value' | 'minValue' | 'maxValue' | 'onChange'> & {
  disabled?: boolean;
  className?: string;
  value?: Date | null;
  minValue?: Date;
  maxValue?: Date;
  calendarYearRange?: number;
  onChange?: (value: Date | null) => void;
};

const DatePicker = ({
  value,
  disabled,
  className,
  onChange,
  minValue,
  maxValue,
  calendarYearRange,
  hourCycle = 24,
  ...props
}: DatePickerProps) => {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const initialValue = value ? parseDateTime(format(value, "yyyy-MM-dd'T'HH:mm:ss")) : value;

  const handleChangeDate = useCallback(
    (dateValue: DateValue | null) => {
      if (dateValue) {
        const newDate = dateValue.toDate('America/Sao_Paulo');
        onChange?.(newDate);
      } else {
        onChange?.(null);
      }
    },
    [onChange, minValue, maxValue],
  );

  const state = useDatePickerState({
    ...props,
    value: initialValue,
    isDisabled: disabled,
    onChange: handleChangeDate,
    minValue: minValue ? parseDateTime(format(minValue, "yyyy-MM-dd'T'HH:mm:ss")) : undefined,
    maxValue: maxValue ? parseDateTime(format(maxValue, "yyyy-MM-dd'T'HH:mm:ss")) : undefined,
    shouldForceLeadingZeros: true,
  });

  const { fieldProps, groupProps } = useDatePicker(
    {
      'aria-label': 'Date Picker',
      hourCycle: hourCycle,
      ...props,
      isDisabled: disabled,
      onChange: handleChangeDate,
      minValue: minValue ? parseDateTime(format(minValue, "yyyy-MM-dd'T'HH:mm:ss")) : undefined,
      maxValue: maxValue ? parseDateTime(format(maxValue, "yyyy-MM-dd'T'HH:mm:ss")) : undefined,
      shouldForceLeadingZeros: true,
    },
    state,
    ref,
  );

  return (
    <div
      {...groupProps}
      ref={ref}
      className={cn(
        'inline-flex shadow-sm items-center h-10 w-full flex-1 rounded-md border border-input bg-transparent px-3 py-1 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className,
        disabled ? 'cursor-not-allowed opacity-50' : '',
      )}
    >
      <DateField {...fieldProps} />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            type="button"
            size="icon"
            className={cn('size-6 text-muted-foreground')}
            disabled={disabled}
            onClick={(e) => e.stopPropagation()}
          >
            <Icon name="Calendar" className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-1">
          <div className="space-y-3">
            <Calendar
              onChange={(selectedDate) => {
                state.setDateValue(parseDate(format(selectedDate, 'yyyy-MM-dd')));
                setOpen(false);
              }}
              value={state.value?.toDate('America/Sao_Paulo')}
              disabled={disabled}
              minValue={minValue}
              maxvalue={maxValue}
              yearRange={calendarYearRange}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export { DatePicker };
