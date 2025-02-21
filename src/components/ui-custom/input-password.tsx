import { forwardRef, ReactNode } from 'react';
import { PasswordInput, PasswordInputAdornmentToggle, PasswordInputInput } from '@/components/ui/password-input';

type InputPasswordProps = {
  leftAdornment?: ReactNode;
} & React.ComponentProps<typeof PasswordInputInput>;

const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ className, leftAdornment, disabled, ...props }, ref) => {
    return (
      <PasswordInput disabled={disabled} className={className}>
        {leftAdornment}
        <PasswordInputInput disabled={disabled} ref={ref} {...props} />
        <PasswordInputAdornmentToggle />
      </PasswordInput>
    );
  },
);

InputPassword.displayName = 'InputPassword';

export { InputPassword };
