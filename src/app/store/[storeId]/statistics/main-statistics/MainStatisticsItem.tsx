import CountUp from 'react-countup';

import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { IMainStatistics } from '@/src/types/statistics.interface';
import { formatPrice } from '@/src/utils/string/format-price';

import { iconMap } from './statistics.util';

type Props = {
  item: IMainStatistics;
};
const MainStatisticsItem = ({ item }: Props) => {
  const IconComponent = iconMap[item.id];

  return (
    <Card className="shadow-sm rounded-lg py-3">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-lg text-black/70">{item.name}</CardTitle>
        <IconComponent size={22} />
      </CardHeader>
      <CardContent>
        <h2 className="text-2xl font-bold">
          {item.id !== 1 ? (
            <CountUp end={item.value} />
          ) : (
            <CountUp end={item.value} formattingFn={formatPrice} />
          )}
        </h2>
      </CardContent>
    </Card>
  );
};

export default MainStatisticsItem;
