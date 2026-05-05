import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/src/components/ui/button';
import { PUBLIC_URL } from '@/src/config/url.config';
import { SITE_DESCRIPTION } from '@/src/constants/seo.constants';

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] gap-6 px-20">
      <h1 className="text-5xl font-bold text-center">
        Ваш шоппинг, ваше удовольствие - <br />
        <span className="text-blue-500">все в одном месте</span>
      </h1>
      <p className="max-w-200 text-center text-black/70">{SITE_DESCRIPTION}</p>
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
