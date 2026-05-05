'use client';

import { FC, ReactNode, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import useCreateStore from '@/src/hooks/queries/stores/useCreateStore';

import { Button } from '../button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../dialog';
import { Field, FieldError, FieldGroup, FieldLabel } from '../field';
import { Input } from '../input';

type IProps = {
  children: ReactNode;
  closeFunc?: (bool: boolean) => void;
};

const CreateStoreModal: FC<IProps> = ({ children, closeFunc }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { createStore } = useCreateStore();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<{ title: string }>({
    mode: 'onChange',
    defaultValues: { title: '' },
  });

  const onSubmit: SubmitHandler<{ title: string }> = async (data) => {
    await createStore(data);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="w-full" asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className="mb-2">
            <DialogTitle>Создания магазина</DialogTitle>
            <DialogDescription>Для создание магазина необходимо указать название</DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <FieldLabel>Название</FieldLabel>
              <Input
                {...register('title', {
                  required: 'Название обязательно',
                })}
              />
              <FieldError>{errors.title?.message}</FieldError>
            </Field>
            <Field orientation="horizontal">
              <Button
                className="bg-blue-500 font-bold ml-auto rounded-md w-22"
                type="submit"
                onClick={() => closeFunc?.(false)}
              >
                Создать
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateStoreModal;
