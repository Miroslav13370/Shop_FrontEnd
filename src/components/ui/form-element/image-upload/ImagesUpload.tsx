import { ImagePlus } from 'lucide-react';
import { ChangeEvent, useRef } from 'react';
import { toast } from 'sonner';

import { useAddFileMutation } from '@/src/api/file/uploadFileApi';

import { Button } from '../../button';

type ImagesUploadProps = {
  value: string[];
  onChange: (value: string[]) => void;
};

const ImagesUpload = ({ value, onChange }: ImagesUploadProps) => {
  const [addFile] = useAddFileMutation();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleOpenFilePicker = () => {
    inputRef.current?.click();
  };

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files?.length) return;

    const formData = new FormData();

    Array.from(files).forEach((file) => {
      formData.append('files', file);
    });

    try {
      const uploadedFiles = await addFile(formData).unwrap();
      const urls = uploadedFiles.map((file) => file.url);
      onChange([...value, ...urls]);
      toast.success('Успешное добавление фото');
    } catch {
      toast.success('При добавлении фото произошла ошибка');
    }
  };
  return (
    <div>
      <input multiple type="file" onChange={handleUpload} hidden ref={inputRef} />
      <Button variant="secondary" type="button" onClick={handleOpenFilePicker}>
        <ImagePlus size={20} />
        Загрузить картинки
      </Button>
    </div>
  );
};

export default ImagesUpload;
