import React, { forwardRef, ReactElement, useCallback, useEffect, useState } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { Icon, IconName } from './icon';
import { InputText } from './input-text';
import { toast } from './toast';
import { buttonVariants } from '@/components/ui';
import { cn } from '@/lib/utils';

type UploadProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Lista de arquivos atuais. */
  value?: File[] | null;

  /** Permitir a reseleção de arquivos. */
  reSelect?: boolean;

  /** Desabilita o componente. O padrão é false. */
  disabled?: boolean;

  /** Callback chamado quando o valor dos arquivos é alterado. */
  onValueChange?: (value: File[] | null) => void;

  /** Permitir múltiplos arquivos. O padrão é false. */
  multiple?: boolean;

  /** Limitação de número máximo de arquivos. O padrão é 1. */
  maxFiles?: number;

  /** Limitação de tamanho máximo dos arquivos em bytes. O padrão é 4 * 1024 * 1024 (4MB). */
  maxSize?: number;

  /** Tipos de arquivo permitidos. O padrão é {}. */
  accept?: Record<string, string[]>;
};

/**
 * Componente de upload de arquivos customizado com suporte a seleção de múltiplos arquivos, validação de tamanho e tipo, e navegação com teclado.
 *
 * @param {UploadProps}
 * @returns {ReactElement}
 */
const Upload = forwardRef<HTMLDivElement, UploadProps>(
  (
    {
      className,
      value,
      onValueChange,
      reSelect,
      disabled,
      children,
      multiple = false,
      maxFiles = 1,
      maxSize = 4 * 1024 * 1024,
      accept = {},
      ...props
    },
    ref,
  ): ReactElement => {
    const [isLOF, setIsLOF] = useState(false);
    const reSelectAll = maxFiles === 1 ? true : reSelect;
    const isInputDisabled = disabled || isLOF;

    const removeFileFromSet = useCallback(
      (i: number) => {
        if (!value) return;
        const newFiles = value.filter((_, index) => index !== i);
        onValueChange?.(newFiles);
      },
      [value, onValueChange],
    );

    const onDrop = useCallback(
      (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        if (disabled) return;

        const files = acceptedFiles;

        const newValues: File[] = value ? [...value] : [];

        if (reSelectAll) newValues.splice(0, newValues.length);

        files.forEach((file) => {
          if (newValues.length < maxFiles) {
            newValues.push(file);
          }
        });

        onValueChange?.(newValues);

        for (const rejectedFile of rejectedFiles) {
          if (rejectedFile.errors[0]?.code === 'file-too-large') {
            toast.error(`Tamanho não suportado. Máximo ${maxSize / 1024 / 1024}MB`);
            break;
          }

          toast.error('Arquivo não suportado!');
          break;
        }
      },
      [reSelectAll, value, disabled],
    );

    useEffect(() => {
      setIsLOF(value?.length === maxFiles && !reSelect);
    }, [value, maxFiles]);

    const opts = { maxFiles, maxSize, multiple, accept };

    const dropzoneState = useDropzone({
      ...opts,
      onDrop,
    });

    const rootProps = isInputDisabled ? {} : dropzoneState.getRootProps();

    return (
      <div
        ref={ref}
        tabIndex={disabled ? -1 : 0}
        className={cn(
          'w-full focus:outline-none overflow-hidden',
          disabled ? 'opacity-50 cursor-not-allowed' : '',
          className,
        )}
        {...props}
      >
        <div className="w-full px-1 space-y-2">
          <div className={cn('relative w-full', isInputDisabled ? 'opacity-50 pointer-events-none' : 'cursor-pointer')}>
            <div className="w-full" {...rootProps}>
              {children}
            </div>
            <InputText
              ref={dropzoneState.inputRef}
              disabled={isInputDisabled}
              {...dropzoneState.getInputProps()}
              className={`${isInputDisabled ? 'cursor-not-allowed' : ''}`}
            />
          </div>
          {value?.map((val, index) => (
            <UploadItem key={index} name={val.name} onRemove={() => removeFileFromSet(index)} disabled={disabled} />
          ))}
        </div>
      </div>
    );
  },
);

Upload.displayName = 'Upload';

type UploadItemProps = {
  /** Indica se o item está ativo. */
  isActive?: boolean;

  /** Nome do arquivo exibido no item. */
  name: string;

  /** Desabilita o componente. O padrão é false. */
  disabled?: boolean;

  /** Callback acionado ao remover o item. */
  onRemove?: () => unknown;
};

/**
 * Componente de item de arquivo customizado que exibe informações do arquivo e botão para remoção.
 *
 * @param {UploadItemProps}
 * @returns {ReactElement}
 */
const UploadItem = ({ name, onRemove, disabled }: UploadItemProps): ReactElement => {
  return (
    <div
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        'p-2 justify-between items-center truncate gap-2 h-9 w-full',
        disabled ? 'pointer-events-none' : '',
      )}
    >
      <Icon name="Paperclip" className="w-4 h-4 text-muted-foreground" />
      <span className="truncate flex-grow">{name}</span>
      <button
        type="button"
        onClick={onRemove}
        disabled={disabled}
        className={cn('p-1', disabled ? 'cursor-not-allowed' : 'hover:text-destructive duration-200 ease-in-out')}
      >
        <Icon name="Trash" className="w-4 h-4" />
      </button>
    </div>
  );
};

UploadItem.displayName = 'UploadItem';

type UploadAreaProps = {
  /** Descrição opcional exibida abaixo da área de upload. */
  description?: string;

  /** Nome do ícone exibido na área de upload. */
  icon?: IconName;
};

/**
 * Área de upload de arquivos customizada com suporte para upload por clique ou arraste e solte.
 *
 * @param {UploadAreaProps}
 * @returns {ReactElement}
 */
const UploadArea = ({ description = '', icon = 'Upload' }: UploadAreaProps): ReactElement => {
  return (
    <div className="w-full flex flex-col p-4 gap-3 bg-background border-dashed border-border border-2 rounded-lg items-center justify-center">
      <Icon name={icon} className="text-muted-foreground" size={40} />
      <span className="text-sm text-muted-foreground text-center">
        <strong>Clique para enviar</strong> ou arraste e solte o arquivo.
      </span>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
};

UploadArea.displayName = 'UploadArea';

export { Upload, UploadArea };
