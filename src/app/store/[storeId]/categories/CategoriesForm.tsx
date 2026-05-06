import { Trash2Icon } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Heading } from '@/src/components/ui/Heading';
import { Button } from '@/src/components/ui/button';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/src/components/ui/field';
import { Input } from '@/src/components/ui/input';
import { ConfirmModals } from '@/src/components/ui/modals/ConfirmModals';
import { Textarea } from '@/src/components/ui/textarea';
import useCreateCategory from '@/src/hooks/queries/categories/useCreateCategory';
import useDeleteCategory from '@/src/hooks/queries/categories/useDeleteCategory';
import useUpdateCategory from '@/src/hooks/queries/categories/useUpdateCategory';
import useDeleteColor from '@/src/hooks/queries/colors/useDeleteColor';
import { ICategoryInput } from '@/src/types/category.interface';

interface Props {
  category?: ICategoryInput;
}

export const CategoryForm = ({ category }: Props) => {
  const title = category ? 'Изменить данные' : 'Создать категорию';

  const description = category
    ? 'Изменить данные о категории'
    : 'Добавить новую категорию в магазин';

  const action = category ? 'Сохранить' : 'Создать';

  const { updateCategory } = useUpdateCategory();

  const { createCategory } = useCreateCategory();

  const { deleteCategory, isLoadingDeleteCategory } = useDeleteCategory();

  const { register, handleSubmit } = useForm<ICategoryInput>({
    mode: 'onChange',
    values: {
      title: category?.title || '',
      description: category?.description || '',
    },
  });

  const onSubmit: SubmitHandler<ICategoryInput> = (data) => {
    if (category) updateCategory(data);
    else createCategory(data);
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-4">
        <Heading title={title} description={description} />
        <div className={`${category ? '' : 'hidden'}`}>
          <ConfirmModals handlerFunc={deleteCategory}>
            <Button className="bg-blue-500 w-12 h-11" disabled={isLoadingDeleteCategory}>
              <Trash2Icon />
            </Button>
          </ConfirmModals>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet>
            <div className="flex flex-col gap-3">
              <Field className="w-2/5">
                <FieldLabel>Название</FieldLabel>
                <Input
                  {...register('title', { required: 'Введите название' })}
                  className="rounded-sm"
                />
              </Field>
              <Field className="max-h-50">
                <FieldLabel>Описание</FieldLabel>
                <Textarea
                  {...register('description', { required: 'Введите значение' })}
                  className="rounded-sm"
                />
              </Field>
            </div>
          </FieldSet>
          <Field orientation="horizontal">
            <Button className="bg-blue-500 font-bold rounded-md w-23 h-9 mr-auto" type="submit">
              {action}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
};
