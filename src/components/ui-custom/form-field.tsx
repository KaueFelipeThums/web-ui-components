import { ReactElement, ReactNode } from 'react';
import { Controller, FieldValues, FieldPath, ControllerProps } from 'react-hook-form';
import { Label } from '@/components/ui';
import { cn } from '@/lib/utils';

type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = ControllerProps<TFieldValues, TName> & {
  /** Texto que aparece como rótulo do campo. */
  label?: ReactNode;

  /** Texto de descrição adicional para o campo. */
  description?: ReactNode;

  /** Classe CSS para customizar o contêiner do campo. */
  className?: string;

  /** Flag para ocultar a mensagem de erro. */
  hideErrorMessage?: boolean;

  /** Classe CSS adicional para o controle do formulário. */
  formControlClassName?: string;
};

/**
 * Componente customizado para campos de formulário.
 *
 * @param {FormFieldProps<TFieldValues, TName>}
 * @returns {JSX.Element}
 */
const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  description,
  className,
  rules,
  disabled = false,
  hideErrorMessage = false,
  defaultValue,
  render,
}: FormFieldProps<TFieldValues, TName>): ReactElement => {
  return (
    <Controller
      control={control}
      name={name}
      disabled={disabled}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState, formState }) => (
        <div className={cn('space-y-2', className)}>
          {label && (
            <Label>
              {label} {rules?.required && <span className="text-destructive">*</span>}
            </Label>
          )}
          {render({ field, fieldState, formState })}
          {description && <span className="text-secondary text-sm">{description}</span>}
          {!hideErrorMessage && fieldState.error?.message && (
            <span className="text-destructive text-xs flex items-center gap-1">{fieldState.error.message}</span>
          )}
        </div>
      )}
    />
  );
};

FormField.displayName = 'FormField';

export { FormField };
