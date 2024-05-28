import { Badge } from './ui/badge';

interface PaidBadgeProps {
    isPaid: boolean;
}

export function PaidBadge({ isPaid }: PaidBadgeProps) {
    return (
        <Badge variant={isPaid ? 'default' : 'warning'}>
            {isPaid ? 'Paid' : 'Not paid'}
        </Badge>
    );
}
