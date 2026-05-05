import Image from 'next/image';
import CountUp from 'react-countup';

import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Separator } from '@/src/components/ui/separator';
import { ILastUsers } from '@/src/types/statistics.interface';
import { formatPrice } from '@/src/utils/string/format-price';
import { returnImagesUrl } from '@/src/utils/url/returnImagesUrl';

type Props = {
  data: ILastUsers[];
};
export const LastUsers = ({ data }: Props) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-bold text-xl sm:text-2xl">Покупатели</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-3">
        {data.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <Image
              src={returnImagesUrl(item.picture)}
              alt={item.name}
              width={40}
              height={40}
              unoptimized
              loading="eager"
              className="rounded-full"
            />
            <div className="flex flex-col tracking-wide">
              <p className="sm:text-[16px] text-[14px]">{item.name}</p>
              <p className="text-black/65 text-[10px] sm:text-sm">{item.email}</p>
            </div>
            <p className="ml-auto font-bold text-lg">
              +<CountUp end={item.total} formattingFn={formatPrice} />
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
