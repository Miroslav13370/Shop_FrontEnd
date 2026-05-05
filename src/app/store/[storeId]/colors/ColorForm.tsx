import { Trash2Icon } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Heading } from '@/src/components/ui/Heading';
import { Button } from '@/src/components/ui/button';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/src/components/ui/field';
import { Input } from '@/src/components/ui/input';
import { ConfirmModals } from '@/src/components/ui/modals/ConfirmModals';
import useCreateColor from '@/src/hooks/queries/colors/useCreateColor';
import useDeleteColor from '@/src/hooks/queries/colors/useDeleteColor';
import useUpdateColor from '@/src/hooks/queries/colors/useUpdateColor';
import { IColor, IColorInput } from '@/src/types/color.interface';

interface Props {
  color?: IColor;
}

export const ColorForm = ({ color }: Props) => {
  const title = color ? 'Изменить данные' : 'Создать цвет';

  const description = color ? 'Изменить данные о цвете' : 'Добавить новый цвет в магазин';

  const action = color ? 'Сохранить' : 'Создать';

  const { updateColor } = useUpdateColor();

  const { createColor } = useCreateColor();

  const { deleteColor, isLoadingDeleteColor } = useDeleteColor();

  const { register, handleSubmit } = useForm<IColorInput>({
    mode: 'onChange',
    values: {
      name: color?.name || '',
      value: color?.value || '',
    },
  });

  const onSubmit: SubmitHandler<IColorInput> = (data) => {
    if (color) updateColor(data);
    else createColor(data);
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-4">
        <Heading title={title} description={description} />
        <div className={`${color ? '' : 'hidden'}`}>
          <ConfirmModals handlerFunc={deleteColor}>
            <Button className="bg-blue-500 w-12 h-11" disabled={isLoadingDeleteColor}>
              <Trash2Icon />
            </Button>
          </ConfirmModals>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet>
            <div className="grid grid-cols-3 gap-3">
              <Field className="col-span-1">
                <FieldLabel>Название</FieldLabel>
                <Input
                  {...register('name', { required: 'Введите название' })}
                  className="rounded-sm"
                />
              </Field>
              <Field className="col-span-1">
                <FieldLabel>Значение</FieldLabel>
                <Input
                  {...register('value', { required: 'Введите значение' })}
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
