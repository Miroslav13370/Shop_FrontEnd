import { Trash2Icon, TrashIcon } from 'lucide-react';
import Image from 'next/image';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { Heading } from '@/src/components/ui/Heading';
import { Button } from '@/src/components/ui/button';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/src/components/ui/field';
import ImagesUpload from '@/src/components/ui/form-element/image-upload/ImagesUpload';
import { Input } from '@/src/components/ui/input';
import { ConfirmModals } from '@/src/components/ui/modals/ConfirmModals';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';
import { Textarea } from '@/src/components/ui/textarea';
import useDeleteImage from '@/src/hooks/file/useDeleteImage';
import useCreateProduct from '@/src/hooks/queries/products/useCreateProduct';
import useDeleteProduct from '@/src/hooks/queries/products/useDeleteProduct';
import useUpdateProduct from '@/src/hooks/queries/products/useUpdateProduct';
import { ICategory } from '@/src/types/category.interface';
import { IColor } from '@/src/types/color.interface';
import { IProduct, IProductInput } from '@/src/types/product.interface';
import formatURLImage from '@/src/utils/string/formatURLImage';

interface Props {
  product?: IProduct;
  categories: ICategory[];
  colors: IColor[];
}

export const ProductForm = ({ product, categories, colors }: Props) => {
  const { createProduct, isLoadingCreateProduct } = useCreateProduct();

  const { updateProduct, isLoadingUpdateProduct } = useUpdateProduct();

  const { deleteImage, isLoadingDeleteImage } = useDeleteImage();

  const { deleteProduct, isLoadingDeleteProduct } = useDeleteProduct();

  const title = product ? 'Изменить данные' : 'Создать товар';

  const description = product ? 'Изменить данные о товаре' : 'Добавить новый товар в магазин';

  const action = product ? 'Сохранить' : 'Создать';

  const { register, handleSubmit, control } = useForm<IProductInput>({
    mode: 'onChange',
    values: {
      title: product?.title || '',
      description: product?.description || '',
      images: product?.images || [],
      price: product?.price || 0,
      categoryId: product?.category?.id || '',
      colorId: product?.color?.id || '',
    },
  });

  const onSubmit: SubmitHandler<IProductInput> = (data) => {
    data.price = Number(data.price);

    console.log(data);

    if (product) updateProduct(data);
    else createProduct(data);
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-4">
        <Heading title={title} description={description} />
        <div className={`${product ? '' : 'hidden'}`}>
          <ConfirmModals handlerFunc={deleteProduct}>
            <Button className="bg-blue-500 w-12 h-11" disabled={isLoadingDeleteProduct}>
              <Trash2Icon />
            </Button>
          </ConfirmModals>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet>
            <Field>
              <FieldLabel>Картинки</FieldLabel>
              <Controller
                render={({ field }) => (
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-2">
                      {field.value.map((image) => (
                        <div key={image} className="relative">
                          <Button
                            type="button"
                            className="absolute"
                            variant="secondary"
                            onClick={async () => {
                              const imageId = formatURLImage(image);

                              await deleteImage(imageId);

                              field.onChange(
                                field.value.filter((currentImage) => currentImage !== image),
                              );
                            }}
                            disabled={isLoadingDeleteImage}
                            hidden={field.value.length === 1}
                          >
                            <TrashIcon />
                          </Button>

                          <Image
                            src={image}
                            alt="Картинка"
                            width={1500}
                            height={1500}
                            className="w-40 h-50 object-cover rounded-md"
                            loading="eager"
                          />
                        </div>
                      ))}
                    </div>

                    <ImagesUpload value={field.value} onChange={field.onChange} />
                  </div>
                )}
                control={control}
                name="images"
              />
            </Field>
            <div className="grid grid-cols-3 gap-4">
              <Field>
                <FieldLabel>Название товара</FieldLabel>
                <Input
                  placeholder="Название товара"
                  {...register('title', {
                    required: 'Название обязательно',
                  })}
                />
              </Field>
              <Field>
                <FieldLabel>Цена</FieldLabel>
                <Input
                  type="number"
                  {...register('price', {
                    required: 'Название обязательно',
                  })}
                />
              </Field>
              <Field>
                <FieldLabel>Категория</FieldLabel>
                <Controller
                  control={control}
                  name="categoryId"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Категория товара" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((item) => (
                          <SelectItem value={item.id} key={item.id}>
                            {item.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Field>
                <FieldLabel>Цвет</FieldLabel>
                <Controller
                  control={control}
                  name="colorId"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Цвет товара" />
                      </SelectTrigger>
                      <SelectContent>
                        {colors.map((item) => (
                          <SelectItem value={item.id} key={item.id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>
            </div>
            <Field>
              <FieldLabel>Описание</FieldLabel>
              <Textarea
                {...register('description')}
                className="max-h-50"
                placeholder="Описание магазина"
              />
            </Field>
          </FieldSet>
          <Field orientation="horizontal">
            <Button
              type="submit"
              className="bg-blue-500 font-bold rounded-md w-23 h-9 mr-auto"
              disabled={isLoadingCreateProduct && isLoadingUpdateProduct}
            >
              {action}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
};
