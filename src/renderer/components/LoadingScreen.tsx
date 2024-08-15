import { cn } from '@/lib/utils';
import Spinner from '@/renderer/components/ui/Spinner';

type Props = { size?: number } & React.HTMLAttributes<HTMLDivElement>;
export default function LoadingScreen({
    className,
    size = 10,
    ...props
}: Props) {
    return (
        <div
            className={cn('grid w-full place-items-center', className)}
            {...props}
        >
            <Spinner size={size} />
        </div>
    );
}
