import React, { useCallback } from 'react';

import { Icon } from './icon';
import {
  FileList,
  FileListAction,
  FileListDescription,
  FileListHeader,
  FileListIcon,
  FileListInfo,
  FileListItem,
  FileListName,
  FileListSize,
  Dropzone,
  DropzoneDescription,
  DropzoneGroup,
  DropzoneInput,
  DropzoneTitle,
  DropzoneUploadIcon,
  DropzoneZone,
} from '@/components/ui';

type UploadProps = {
  onUpload?: (files: File[]) => void;
  renderFile?: (file: File) => React.ReactNode;
  files?: File[] | null;
  title: string;
  description?: string;
} & Omit<React.ComponentProps<typeof Dropzone>, 'children'>;

const Upload = ({ title, description, files = [], onDropAccepted, onUpload, renderFile, ...props }: UploadProps) => {
  const remove = useCallback(
    (i: number) => {
      if (!files) return;
      const newFiles = files.filter((_, index) => index !== i);
      onUpload?.(newFiles);
    },
    [files],
  );

  const onAccept = useCallback(
    (newFiles: File[]) => {
      onUpload?.([...(files ?? []), ...newFiles]);
    },
    [files],
  );

  return (
    <Dropzone
      onDropAccepted={(newFiles, event) => {
        onAccept(newFiles);
        onDropAccepted?.(newFiles, event);
      }}
      {...props}
    >
      <div className="grid gap-4">
        <DropzoneZone>
          <DropzoneInput />
          <DropzoneGroup className="gap-4">
            <DropzoneUploadIcon />
            <DropzoneGroup>
              <DropzoneTitle>{title}</DropzoneTitle>
              <DropzoneDescription>{description}</DropzoneDescription>
            </DropzoneGroup>
          </DropzoneGroup>
        </DropzoneZone>
        <FileList>
          {files?.map(
            (file, index) =>
              renderFile?.(file) ?? (
                <FileListItem key={file.name}>
                  <FileListHeader>
                    <FileListIcon />
                    <FileListInfo>
                      <FileListName>{file.name}</FileListName>
                      <FileListDescription>
                        <FileListSize>{file.size}</FileListSize>
                      </FileListDescription>
                    </FileListInfo>
                    <FileListAction onClick={() => remove(index)}>
                      <Icon name="Trash" className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </FileListAction>
                  </FileListHeader>
                </FileListItem>
              ),
          )}
        </FileList>
      </div>
    </Dropzone>
  );
};

export { Upload };
