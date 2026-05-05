import { ReactNode, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Rating } from 'react-simple-star-rating';

import useCreateReview from '@/src/hooks/queries/reviews/useCreateReview';
import { IReviewInput } from '@/src/types/review.interface';

import { Button } from '../button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../dialog';
import { Field, FieldGroup, FieldTitle } from '../field';
import { Textarea } from '../textarea';
import { ConfirmModals } from './ConfirmModals';

type Props = {
  children: ReactNode;
  storeId: string;
};
export const ReviewModal = ({ children, storeId }: Props) => {
  const [open, setIsOpen] = useState(false);

  const { reset, register, control, handleSubmit } = useForm<IReviewInput>({
    mode: 'onChange',
  });

  const { createReview, isLoadingCreateReview } = useCreateReview(storeId);

  const onSubmit: SubmitHandler<IReviewInput> = (data) => {
    console.log('ff');
    createReview(data);
    reset();
    setIsOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="min-w-120">
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader className="mb-2">
              <DialogTitle>Создание отзыва</DialogTitle>
              <DialogDescription>
                Для Создания отзыва необходимо указать рейтинг и текст.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup className="mb-3">
              <Field>
                <Controller
                  control={control}
                  name="rating"
                  rules={{ required: 'Укажите рейтинг' }}
                  render={({ field }) => (
                    <div className="**:inline-block">
                      <Rating
                        initialValue={0}
                        iconsCount={5}
                        size={25}
                        onClick={(rate) => field.onChange(rate)}
                      />
                    </div>
                  )}
                />
              </Field>
              <Field>
                <FieldTitle>Текст</FieldTitle>
                <Textarea
                  className="max-h-50"
                  placeholder="Текст отзыва"
                  {...register('text', {
                    required: 'Укажите текст отзыва',
                  })}
                />
              </Field>
            </FieldGroup>
            <div className="flex">
              <Button
                variant="primary"
                className="h-10 w-27 ml-auto mr-0"
                type="submit"
                disabled={isLoadingCreateReview}
              >
                Добавить
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
