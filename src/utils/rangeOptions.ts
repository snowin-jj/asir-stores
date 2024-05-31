import { isValid, startOfDay, subDays } from 'date-fns';
import { formatDate } from './formatters';

export const RANGE_OPTIONS = {
    last_7_days: {
        label: 'Last 7 Days',
        startDate: startOfDay(subDays(new Date(), 6)),
        endDate: new Date(),
    },
    last_30_days: {
        label: 'Last 30 Days',
        startDate: startOfDay(subDays(new Date(), 29)),
        endDate: new Date(),
    },
    last_90_days: {
        label: 'Last 90 Days',
        startDate: startOfDay(subDays(new Date(), 89)),
        endDate: new Date(),
    },
    last_365_days: {
        label: 'Last 365 Days',
        startDate: startOfDay(subDays(new Date(), 364)),
        endDate: new Date(),
    },
    all_time: {
        label: 'All Time',
        //@ts-ignore
        startDate: null,
        endDate: new Date(),
    },
};
export function getRangeOption(range?: string, from?: string, to?: string) {
    if (range == null) {
        const startDate = new Date(from || '');
        const endDate = new Date(to || '');
        if (!isValid(startDate) || !isValid(endDate)) return;

        return {
            label: `${formatDate(startDate)} - ${formatDate(endDate)}`,
            startDate,
            endDate,
        };
    }
    return RANGE_OPTIONS[range as keyof typeof RANGE_OPTIONS];
}
