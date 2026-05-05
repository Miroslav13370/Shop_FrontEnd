import useGetStatistics from '@/src/hooks/queries/statistics/useGetStatistics';

import { LastUsers } from './LastUsers';
import { Overview } from './Overview';

const MiddleStatistics = () => {
  const { middle } = useGetStatistics();

  return (
    <div className="mt-5 grid grid-cols-1 gap-y-4 xl:gap-4 xl:grid-cols-7  ">
      {middle?.monthlySales.length || middle?.lastUsers.length ? (
        <>
          <div className="col-span-4">
            <Overview data={middle.monthlySales} />
          </div>
          <div className="col-span-3">
            <LastUsers data={middle.lastUsers} />
          </div>
        </>
      ) : (
        'Нет данных для статистики'
      )}
    </div>
  );
};

export default MiddleStatistics;
