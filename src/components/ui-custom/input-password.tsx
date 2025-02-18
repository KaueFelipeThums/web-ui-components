import { forwardRef, MouseEvent, ReactElement, useState } from 'react';
import { Button } from './button';
import { Icon } from './icon';
import { InputText, InputTextProps } from './input-text';

type InputPasswordProps = Omit<InputTextProps, 'rightComponent'>;

/**
 * Componente de input de senha personalizado.
 *
 * @param {InputPasswordProps}
 * @returns {ReactElement}
 */
const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(({ disabled, ...props }, ref): ReactElement => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowPassword((prev) => !prev);
  };

  return (
    <InputText
      {...props}
      ref={ref}
      autoComplete="off"
      type={showPassword ? 'text' : 'password'}
      disabled={disabled}
      rightComponent={
        <Button
          size="icon"
          disabled={disabled}
          variant="outline"
          type="button"
          className="rounded-tl-none rounded-bl-none bg-transparent border-0 border-l"
          onClick={handleClickShowPassword}
        >
          <Icon name={showPassword ? 'Eye' : 'EyeOff'} className="h-4 w-4" />
        </Button>
      }
    />
  );
});

InputPassword.displayName = 'InputPassword';

export { InputPassword };
