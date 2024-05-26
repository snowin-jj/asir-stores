import { Badge } from './ui/badge';

type ActivityBadgeProps = {
    isActive: boolean;
    reorderPoint: number;
    stock: number;
};
export function ActivityBadge({
    isActive,
    reorderPoint,
    stock,
}: ActivityBadgeProps) {
    let statusColor: string;
    if (stock <= reorderPoint) statusColor = 'bg-yellow-200 text-yellow-800';
    if (stock <= 1) statusColor = 'bg-red-200 text-red-800';
    return (
        <Badge
            variant={
                stock <= 1
                    ? 'destructive'
                    : stock <= reorderPoint
                      ? 'warning'
                      : isActive
                        ? 'default'
                        : 'secondary'
            }
        >
            {isActive ? 'Active' : 'Inactive'}
        </Badge>
    );
}
