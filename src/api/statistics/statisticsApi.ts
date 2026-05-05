import { IMainStatistics, IMiddleStatistics } from '@/src/types/statistics.interface';

import { api } from '../api';

export const statisticsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMainStatistics: build.query<IMainStatistics[], string>({
      query: (storeId) => ({
        url: `/statistics/main/${storeId}`,
      }),
    }),

    getMiddleStatistics: build.query<IMiddleStatistics, string>({
      query: (storeId) => ({
        url: `/statistics/middle/${storeId}`,
      }),
    }),
  }),
});

export const { useGetMainStatisticsQuery, useGetMiddleStatisticsQuery } = statisticsApi;
