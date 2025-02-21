import { forwardRef, ReactNode } from 'react';
import {
  InputBase,
  InputBaseAdornment,
  InputBaseAdornmentButton,
  InputBaseControl,
  InputBaseInput,
} from '@/components/ui';

type InputTextProps = {
  leftAdornment?: ReactNode;
  rightAdornment?: ReactNode;
} & React.ComponentProps<typeof InputBaseInput>;

const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  ({ className, leftAdornment, rightAdornment, disabled, ...props }, ref) => {
    return (
      <InputBase disabled={disabled} className={className}>
        {leftAdornment}
        <InputBaseControl>
          <InputBaseInput ref={ref} disabled={disabled} {...props} />
        </InputBaseControl>
        {rightAdornment}
      </InputBase>
    );
  },
);

const InputTextAdornmentContent = InputBaseAdornment;

const InputTextAdornmentButton = InputBaseAdornmentButton;

InputText.displayName = 'InputText';

export { InputText, InputTextAdornmentContent, InputTextAdornmentButton, type InputTextProps };
