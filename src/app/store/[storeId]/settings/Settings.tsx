'use client';

import { Trash2Icon } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Heading } from '@/src/components/ui/Heading';
import { Button } from '@/src/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/src/components/ui/field';
import { Input } from '@/src/components/ui/input';
import { ConfirmModals } from '@/src/components/ui/modals/ConfirmModals';
import { Textarea } from '@/src/components/ui/textarea';
import useDeleteStore from '@/src/hooks/queries/stores/useDeleteStore';
import useUpdateStore from '@/src/hooks/queries/stores/useUpdateStore';
import { IStoreEdit } from '@/src/types/store.interface';

const Settings = () => {
  const { store, updateStore, isLoadingUpdate } = useUpdateStore();
  const { deleteStore, isLoadingDelete } = useDeleteStore();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IStoreEdit>({
    mode: 'onChange',
    values: {
      title: store?.title || '',
      description: store?.description || '',
    },
  });

  const onSubmit: SubmitHandler<IStoreEdit> = (data) => {
    updateStore(data);
  };

  return (
    <div className="p-5 flex flex-col">
      <div className="flex justify-between items-center">
        <Heading title="Настройки" description="Управление настройками магазина" />
        <ConfirmModals handlerFunc={deleteStore}>
          <Button className="bg-blue-500 w-12 h-11" disabled={isLoadingDelete}>
            <Trash2Icon />
          </Button>
        </ConfirmModals>
      </div>
      <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <Field>
            <FieldLabel>Название</FieldLabel>
            <Input
              className="max-w-80 rounded-sm"
              {...register('title', {
                required: 'Введите название',
              })}
            />
            <FieldError>{errors.title?.message}</FieldError>
          </Field>
          <Field>
            <FieldLabel>Описание</FieldLabel>
            <Textarea
              className="max-h-50 outline-none rounded-sm"
              {...register('description')}
            ></Textarea>
          </Field>
          <Field orientation="horizontal">
            <Button
              type="submit"
              className="bg-blue-500 font-bold rounded-md w-25 h-8 mr-auto"
              disabled={isLoadingUpdate}
            >
              Сохранить
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
};

export default Settings;
