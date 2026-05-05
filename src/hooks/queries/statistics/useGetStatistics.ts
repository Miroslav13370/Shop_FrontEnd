import { useParams } from 'next/navigation';

import {
  useGetMainStatisticsQuery,
  useGetMiddleStatisticsQuery,
} from '@/src/api/statistics/statisticsApi';

const useGetStatistics = () => {
  const params = useParams<{ storeId: string }>();
  const { data: main, isLoading } = useGetMainStatisticsQuery(params.storeId);

  const { data: middle } = useGetMiddleStatisticsQuery(params.storeId);

  return { main, middle, isLoading };
};

export default useGetStatistics;
