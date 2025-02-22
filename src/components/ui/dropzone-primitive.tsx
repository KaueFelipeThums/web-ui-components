import { composeEventHandlers } from '@radix-ui/primitive';
import { Primitive } from '@radix-ui/react-primitive';
import React, { createContext, useContext } from 'react';
import { FileRejection, FileWithPath, useDropzone, type DropzoneOptions, type DropzoneState } from 'react-dropzone';

export type DropzoneContextProps = DropzoneState & DropzoneOptions;

const DropzoneContext = createContext<DropzoneContextProps>({} as DropzoneContextProps);

const useDropzoneContext = () => useContext(DropzoneContext);

export type DropzoneProps = DropzoneOptions & {
  children: React.ReactNode | ((state: DropzoneContextProps) => React.ReactNode);
};

const Dropzone = ({ children, ...props }: DropzoneProps) => {
  const state = useDropzone(props);
  const context = { ...state, ...props };

  return (
    <DropzoneContext.Provider value={context}>
      {typeof children === 'function' ? children(context) : children}
    </DropzoneContext.Provider>
  );
};

const DropzoneInput = React.forwardRef<
  React.ComponentRef<typeof Primitive.input>,
  React.ComponentProps<typeof Primitive.input>
>((props, ref) => {
  const { getInputProps, disabled } = useDropzoneContext();

  return <Primitive.input ref={ref} {...getInputProps({ disabled, ...props })} />;
});
DropzoneInput.displayName = 'DropzoneInput';

const DropzoneZone = React.forwardRef<
  React.ElementRef<typeof Primitive.div>,
  React.ComponentPropsWithoutRef<typeof Primitive.div>
>((props, ref) => {
  const {
    getRootProps,
    isFocused,
    isDragActive,
    isDragAccept,
    isDragReject,
    isFileDialogActive,
    preventDropOnDocument,
    noClick,
    noKeyboard,
    noDrag,
    noDragEventsBubbling,
    disabled,
  } = useDropzoneContext();

  return (
    <Primitive.div
      ref={ref}
      data-prevent-drop-on-document={preventDropOnDocument ? true : undefined}
      data-no-click={noClick ? true : undefined}
      data-no-keyboard={noKeyboard ? true : undefined}
      data-no-drag={noDrag ? true : undefined}
      data-no-drag-events-bubbling={noDragEventsBubbling ? true : undefined}
      data-disabled={disabled ? true : undefined}
      data-focused={isFocused ? true : undefined}
      data-drag-active={isDragActive ? true : undefined}
      data-drag-accept={isDragAccept ? true : undefined}
      data-drag-reject={isDragReject ? true : undefined}
      data-file-dialog-active={isFileDialogActive ? true : undefined}
      {...getRootProps(props)}
    />
  );
});
DropzoneZone.displayName = 'DropzoneZone';

const DropzoneTrigger = React.forwardRef<
  React.ElementRef<typeof Primitive.button>,
  React.ComponentPropsWithoutRef<typeof Primitive.button>
>(({ onClick, ...props }, ref) => {
  const { open } = useDropzoneContext();

  return <Primitive.button ref={ref} onClick={composeEventHandlers(onClick, open)} {...props} />;
});
DropzoneTrigger.displayName = 'DropzoneTrigger';

export interface DropzoneDragAcceptedProps {
  children?: React.ReactNode;
}

const DropzoneDragAccepted = ({ children }: DropzoneDragAcceptedProps) => {
  const { isDragAccept } = useDropzoneContext();

  if (!isDragAccept) {
    return null;
  }

  return children;
};

export interface DropzoneDragRejectedProps {
  children?: React.ReactNode;
}

const DropzoneDragRejected = ({ children }: DropzoneDragRejectedProps) => {
  const { isDragReject } = useDropzoneContext();

  if (!isDragReject) {
    return null;
  }

  return children;
};

export interface DropzoneDragDefaultProps {
  children?: React.ReactNode;
}

const DropzoneDragDefault = ({ children }: DropzoneDragDefaultProps) => {
  const { isDragActive } = useDropzoneContext();

  if (isDragActive) {
    return null;
  }

  return children;
};

export interface DropzoneAcceptedProps {
  children: (acceptedFiles: Readonly<FileWithPath[]>) => React.ReactNode;
}

const DropzoneAccepted = ({ children }: DropzoneAcceptedProps) => {
  const { acceptedFiles } = useDropzoneContext();

  return children(acceptedFiles);
};

export interface DropzoneRejectedProps {
  children: (fileRejections: Readonly<FileRejection[]>) => React.ReactNode;
}

const DropzoneRejected = ({ children }: DropzoneRejectedProps) => {
  const { fileRejections } = useDropzoneContext();

  return children(fileRejections);
};

const Root = Dropzone;
const Input = DropzoneInput;
const Zone = DropzoneZone;
const Trigger = DropzoneTrigger;
const DragAccepted = DropzoneDragAccepted;
const DragRejected = DropzoneDragRejected;
const DragDefault = DropzoneDragDefault;
const Accepted = DropzoneAccepted;
const Rejected = DropzoneRejected;

export { Root, Input, Zone, Trigger, DragAccepted, DragRejected, DragDefault, Accepted, Rejected };
