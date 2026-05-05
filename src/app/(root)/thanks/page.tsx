import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/src/components/ui/button';
import { PUBLIC_URL } from '@/src/config/url.config';
import { NO_INDEX_PAGE } from '@/src/constants/seo.constants';

export const metadata: Metadata = {
  title: 'Спасибо за покупку',
  ...NO_INDEX_PAGE,
};

export default function ThanksPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[86vh] gap-6 px-20">
      <h1 className="text-5xl font-bold text-center">Спасибо за покупку</h1>
      <p className="max-w-200 text-center text-black/70">
        Спасибо за ваш заказ! Мы ценим ваше доверие и приложим все усилия, чтобы доставить ваш заказ
        как можно скорее.
      </p>
      <Link href={PUBLIC_URL.home()}>
        <Button
          variant="primary"
          className="h-10 w-32 transition-all duration-300 hover:w-35  flex justify-between"
        >
          На главную
          <ArrowRight />
        </Button>
      </Link>
    </div>
  );
}
