import { useDateSegment } from '@react-aria/datepicker';
import { DateFieldState, DateSegment as IDateSegment } from '@react-stately/datepicker';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface DateSegmentProps {
  segment: IDateSegment;
  state: DateFieldState;
}

const DateSegment = ({ segment, state }: DateSegmentProps) => {
  const ref = useRef(null);

  const {
    segmentProps: { ...segmentProps },
  } = useDateSegment(segment, state, ref);

  return (
    <div
      {...segmentProps}
      ref={ref}
      className={cn(
        'focus:rounded-[2px] focus:bg-accent focus:text-accent-foreground focus:outline-none',
        segment.type !== 'literal' ? 'px-[2px]' : '',
        segment.isPlaceholder ? 'text-muted-foreground' : '',
      )}
    >
      {segment.text}
    </div>
  );
};

export { DateSegment };
