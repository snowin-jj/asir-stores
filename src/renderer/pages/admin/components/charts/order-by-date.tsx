import { formatCurrency } from '@/utils/formatters';
import { format } from 'date-fns';
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

interface OrderByDateChartProps {
    data: {
        date: string;
        totalSales: number;
    }[];
}

export default function OrderByDateChart({ data }: OrderByDateChartProps) {
    return (
        <ResponsiveContainer width={'100%'} minHeight={300}>
            <LineChart data={data}>
                <CartesianGrid stroke="hsl(var(--muted))" />
                <XAxis
                    dataKey={'date'}
                    stroke="hsl(var(--primary))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    // tickFormatter={(tick) => format(new Date(tick), 'MMM, d')}
                />
                <YAxis
                    tickFormatter={(tick) => formatCurrency(tick)}
                    stroke="hsl(var(--primary))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <Tooltip
                    itemStyle={{ color: 'hsl(240, 10%, 4%)' }}
                    labelStyle={{ color: 'hsl(240, 10%, 4%)' }}
                    formatter={(value) => formatCurrency(value as number)}
                />
                <Line
                    dot={false}
                    dataKey={'totalSales'}
                    type="monotone"
                    name="Total Sales"
                    stroke="hsl(var(--primary))"
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
