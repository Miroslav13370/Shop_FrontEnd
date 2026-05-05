import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardHeader } from '@/src/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/src/components/ui/chart';
import { Separator } from '@/src/components/ui/separator';
import { IMonthlySales } from '@/src/types/statistics.interface';

type Props = {
  data: IMonthlySales[];
};
export const Overview = ({ data }: Props) => {
  const config = {
    value: {
      label: 'Продажи:',
      color: '#6490ED',
    },
  };

  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="font-bold text-2xl">Прибыль</CardHeader>
      <Separator />
      <CardContent>
        <ChartContainer config={config} className="w-full">
          <AreaChart data={data}>
            <XAxis dataKey="date" />
            <Area
              dataKey="value"
              type="basis"
              fill="var(--color-value)"
              stroke="var(--color-value)"
            />
            <CartesianGrid vertical={false} />
            <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
