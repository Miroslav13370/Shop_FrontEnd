'use client';

import Image from 'next/image';
import { useState } from 'react';

import authLogo from '@/public/images/auth.svg';
import { Button } from '@/src/components/ui/button';
import { Field, FieldDescription, FieldGroup, FieldSet } from '@/src/components/ui/field';
import { Input } from '@/src/components/ui/input';

import Social from './Social';
import { useAuthForm } from './useAuthForm';

const Auth = () => {
  const [isReg, setIsReg] = useState(false);

  const {
    form: { handleSubmit, register },
    onSubmit,
    isPending,
  } = useAuthForm(isReg);

  return (
    <div className="flex h-screen">
      <div className="hidden flex-1  bg-blue-400 md:flex justify-center ">
        <Image
          src={authLogo}
          alt="logo"
          width={1000}
          height={1000}
          className="w-30"
          loading="eager"
        ></Image>
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <form className="p-20 lg:p-30" onSubmit={handleSubmit(onSubmit)}>
          <FieldSet>
            <h1 className="mx-auto font-bold block p-0 mb-[-15] text-2xl">
              {isReg ? 'Создать аккаунт' : 'Войти в аккаунт'}
            </h1>
            <FieldDescription className="text-center">
              Войдите или создайте учетную запись, чтобы оформлять покупки
            </FieldDescription>
            <FieldGroup className="flex gap-3">
              {isReg ? (
                <Field>
                  <Input
                    placeholder="Введите имя"
                    disabled={isPending}
                    {...register('name', {
                      required: 'Имя обязательно',
                    })}
                  ></Input>
                </Field>
              ) : null}
              <Field>
                <Input
                  placeholder="Введите почту"
                  disabled={isPending}
                  type="email"
                  {...register('email', {
                    required: 'Почта обязательна',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Неверный формат почты',
                    },
                  })}
                ></Input>
              </Field>
              <Field>
                <Input
                  placeholder="Введите пароль"
                  disabled={isPending}
                  {...register('password', {
                    required: 'Пароль обязателен',
                    minLength: {
                      value: 6,
                      message: 'Минимальная длинна пароля 6 символов',
                    },
                  })}
                  type="password"
                ></Input>
              </Field>
              <Button type="submit" disabled={isPending}>
                Продолжить
              </Button>
            </FieldGroup>
            <FieldGroup className="flex gap-3">
              <Social />
              <FieldGroup className="flex flex-row gap-0">
                <FieldDescription className="m-0">
                  {isReg ? 'Уже есть аккаунт?' : 'Еще нет аккаунта?'}
                </FieldDescription>
                <button
                  className="text-sm -mt-1 -ml-3 cursor-pointer text-blue-400"
                  type="button"
                  onClick={() => setIsReg((reg) => !reg)}
                >
                  {isReg ? 'Войти' : 'Создать'}
                </button>
              </FieldGroup>
            </FieldGroup>
          </FieldSet>
        </form>
      </div>
    </div>
  );
};

export default Auth;
