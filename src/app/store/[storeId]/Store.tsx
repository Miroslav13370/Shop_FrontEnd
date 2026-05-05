'use client';

import { Heading } from '@/src/components/ui/Heading';

import MiddleStatistics from './statistics/MiddleStatistics/MiddleStatistics';
import MainStatistics from './statistics/main-statistics/MainStatistics';

const Store = () => {
  return (
    <div className="p-5 flex flex-col">
      <Heading title="Статистика" className="mb-3" />
      <MainStatistics />
      <MiddleStatistics />
    </div>
  );
};

export default Store;
