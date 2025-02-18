import { ReactElement } from 'react';
import { InputMask } from './input-mask';
import { InputTextProps } from './input-text';

type InputNumberProps = Omit<InputTextProps, 'ref'> & {
  /** Número de dígitos exibidos após a vírgula. */
  digits?: number;

  /** Valor mínimo permitido. */
  min?: number;

  /** Valor máximo permitido. */
  max?: number;

  /** Separador de milhares. */
  thousandsSeparator?: string;

  /** Separador decimal. */
  decimalSeparator?: string;

  /** Normalizar zeros à esquerda. */
  normalizeZeros?: boolean;

  /** Tipo do input. */
  type?: string;

  /** Callback quando o valor é aceito. */
  onAccept?: (value: string) => void;

  /** Callback quando o valor é completo. */
  onComplete?: (value: string) => void;

  /** Valor atual do input. */
  value?: string;
};

/**
 * Componente de input de número personalizado.
 *
 * @param {InputNumberProps}
 * @returns {ReactElement}
 */
const InputNumber = ({
  min,
  max,
  digits = 4,
  thousandsSeparator = '',
  decimalSeparator = ',',
  value,
  normalizeZeros = true,
  onAccept,
  onComplete,
  ...props
}: InputNumberProps): ReactElement => {
  return (
    <InputMask
      {...props}
      thousandsSeparator={thousandsSeparator}
      radix={decimalSeparator}
      mask={Number}
      min={min}
      max={max}
      inputMode="numeric"
      normalizeZeros={normalizeZeros}
      scale={digits}
      onAccept={onAccept}
      onComplete={onComplete}
      autofix={true}
      value={value}
      lazy={true}
    />
  );
};

InputNumber.displayName = 'InputNumber';

export { InputNumber };
