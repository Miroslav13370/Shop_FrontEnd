import { toast } from 'sonner';

import { useDelFileMutation } from '@/src/api/file/uploadFileApi';

const useDeleteFile = () => {
  const [deleteFileMutate, { isLoading: isLoadingDeleteFile }] = useDelFileMutation();

  const deleteFile = async (fileName: string) => {
    try {
      await deleteFileMutate(fileName).unwrap();
      toast.success('Успешное удаление файла');
    } catch {
      toast.error('При удалении файла произошла ошибка');
    }
  };

  return { deleteFile, isLoadingDeleteFile };
};

export default useDeleteFile;
