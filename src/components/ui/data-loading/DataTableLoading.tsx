import { FC } from 'react';

import { Card, CardContent } from '../card';
import { Skeleton } from '../skeleton';
import { Spinner } from '../spinner';

const DataTableLoading: FC = () => {
  return (
    <div className="mx-auto w-full max-w-screen-2xl">
      <Skeleton className="h-8 w-48" />

      <Skeleton className="mt-6 h-8 w-72" />
      <Skeleton />

      <Card className="mt-6">
        <CardContent>
          <div className="flex h-130 w-full items-center justify-center">
            <Spinner />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataTableLoading;
