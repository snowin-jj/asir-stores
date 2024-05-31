import { formatNumber } from '@/utils/formatters';
import { format } from 'date-fns';
import {
    Bar,
    BarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

interface CustomersByDateProps {
    data: {
        date: string;
        totalCustomers: number;
    }[];
}

export default function CustomersByDate({ data }: CustomersByDateProps) {
    return (
        <ResponsiveContainer width={'100%'} minHeight={300}>
            <BarChart data={data}>
                <XAxis
                    dataKey={'date'}
                    stroke="hsl(var(--primary))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    // tickFormatter={(tick) => format(new Date(tick), 'MMM, d')}
                />
                <YAxis
                    tickFormatter={(tick) => formatNumber(tick)}
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    stroke="hsl(var(--primary))"
                />
                <Tooltip
                    formatter={(value) => formatNumber(value as number)}
                    cursor={{ fill: 'hsl(var(--muted))' }}
                    itemStyle={{ color: 'hsl(240, 10%, 4%)' }}
                    labelStyle={{ color: 'hsl(240, 10%, 4%)' }}
                />
                <Bar
                    dataKey={'totalCustomers'}
                    radius={[4, 4, 0, 0]}
                    name="New Customers"
                    stroke="hsl(var(--primary))"
                />
            </BarChart>
        </ResponsiveContainer>
    );
}
