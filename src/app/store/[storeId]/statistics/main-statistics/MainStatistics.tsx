import { Skeleton } from '@/src/components/ui/skeleton';
import useGetStatistics from '@/src/hooks/queries/statistics/useGetStatistics';

import MainStatisticsItem from './MainStatisticsItem';

const MainStatistics = () => {
  const { main } = useGetStatistics();
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1  gap-8 w-full ">
      {main?.length ? (
        main.map((item) => <MainStatisticsItem key={item.id} item={item} />)
      ) : (
        <Skeleton className="h-25 w-full " />
      )}
    </div>
  );
};

export default MainStatistics;
