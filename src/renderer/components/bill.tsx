import { OrderWithDetails } from '@/types/order';
import { forwardRef, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Button } from './ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from './ui/dialog';

interface BillProps {
    order: OrderWithDetails;
}

export default function Bill({ order }: BillProps) {
    const componentRef = useRef(null);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <Dialog>
            <DialogTrigger asChild className="!mt-4 w-full">
                <Button className="w-full">Bill</Button>
            </DialogTrigger>
            <DialogContent>
                <div
                    ref={componentRef}
                    className={`print-area h-[500px] w-[400px] bg-slate-500`}
                >
                    <h2>Printable</h2>
                </div>
                <DialogFooter>
                    <Button className="w-full" onClick={handlePrint}>
                        Print
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

interface PrintablePartProps extends React.HTMLAttributes<HTMLDivElement> {}

const PrintablePart = forwardRef<HTMLDivElement, PrintablePartProps>(
    ({ className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={`h-[500px] w-[400px] bg-slate-500 ${className}`}
                {...props}
            >
                <h2>Printable</h2>
            </div>
        );
    },
);
