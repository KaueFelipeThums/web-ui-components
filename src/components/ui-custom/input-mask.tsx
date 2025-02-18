import { ReactElement } from 'react';
import { IMaskMixin, IMaskInputProps } from 'react-imask';
import { InputText, InputTextProps } from './input-text';

type InputMaskProps = IMaskInputProps<HTMLInputElement> &
  Omit<InputTextProps, 'ref' | 'value' | 'min' | 'max' | 'onChange'>;

/**
 * Componente de mascara personalizado.
 *
 * @param {InputMaskProps}
 * @returns {ReactElement}
 */
const InputMask = IMaskMixin<HTMLInputElement, InputMaskProps>(
  ({ inputRef, ...props }): ReactElement => <InputText {...props} ref={inputRef} />,
);

InputMask.displayName = 'InputMask';

export { InputMask, type InputMaskProps };
