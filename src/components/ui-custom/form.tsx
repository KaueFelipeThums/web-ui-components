import { ReactElement, ReactNode } from 'react';
import { UseFormReturn, FieldValues, SubmitHandler } from 'react-hook-form';

type FormProps<T extends FieldValues> = React.HTMLAttributes<HTMLFormElement> & {
  /** Objeto de retorno do hook `useForm` do `react-hook-form` com os valores e métodos relacionados ao formulário. */
  form: UseFormReturn<T>;

  /** Função de submissão do formulário que será chamada ao submeter o formulário. */
  handleSubmit: SubmitHandler<T>;

  /** Elementos React que serão renderizados dentro do formulário. */
  children: ReactNode;

  /** Define se a funcionalidade de preenchimento automático do navegador está ativada ou não. */
  autoComplete?: string;
};

/**
 * Componente de formulário personalizado.
 *
 * @param {FormProps<T>}
 * @returns {JSX.Element}
 */
const Form = <T extends FieldValues>({
  form,
  handleSubmit,
  children,
  autoComplete = 'off',
  ...props
}: FormProps<T>): ReactElement => {
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} {...props} autoComplete={autoComplete}>
      {children}
    </form>
  );
};

Form.displayName = 'Form';

export { Form };
