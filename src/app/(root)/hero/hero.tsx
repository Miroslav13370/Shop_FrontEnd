import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/src/components/ui/button';
import { PUBLIC_URL } from '@/src/config/url.config';
import { SITE_DESCRIPTION } from '@/src/constants/seo.constants';

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] gap-6 md:px-20 px-8">
      <h1 className="md:text-5xl text-2xl font-bold text-center">
        Ваш шоппинг, ваше удовольствие - <br />
        <span className="text-blue-500">все в одном месте</span>
      </h1>
      <p className="max-w-200 text-center text-black/70 md:text-base text-sm">{SITE_DESCRIPTION}</p>
      <Link href={PUBLIC_URL.explorer()}>
        <Button
          variant="primary"
          className="h-10 w-35 transition-all duration-300 hover:w-38  flex justify-between"
        >
          За покупками
          <ArrowRight />
        </Button>
      </Link>
    </div>
  );
};

export default Hero;
