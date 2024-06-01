import { OrderWithDetails } from '@/types/order';
import { forwardRef, useRef } from 'react';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
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

const pageStyle = `
@page {
    size: 80mm 20mm;
};

@media all {
    .pageBreak {
        display: none;
    }
};

@media print {
    .pageBreak {
        page-break-before: always;
    }
}
`;

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
                <PrintablePart ref={componentRef} />
                <DialogFooter>
                    <ReactToPrint
                        trigger={() => (
                            <Button className="w-full" onClick={handlePrint}>
                                Print
                            </Button>
                        )}
                        content={() => componentRef.current}
                        pageStyle={pageStyle}
                    />
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
                className={`h-[500px] w-[400px] bg-zinc-900 ${className}`}
                {...props}
            >
                <h2>Printable</h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptates quidem, animi modi vitae, corporis est ullam
                    ipsam rerum mollitia, nostrum ratione facilis perferendis
                    amet dolor officia accusamus obcaecati ut repellat in nemo
                    laudantium ex itaque unde illo. Quaerat praesentium nisi
                    harum ab molestias reprehenderit omnis doloremque nihil, sed
                    consequatur illum eius error dolor necessitatibus non
                    excepturi, voluptatibus atque. Sed ullam ipsam ipsa aliquid
                    illo mollitia autem at consequatur laudantium, id similique
                    esse aliquam alias placeat. Assumenda soluta ad maxime non
                    laudantium, minus asperiores eligendi mollitia in voluptatem
                    vitae expedita nihil quae, sapiente quis obcaecati. Sit
                    molestiae ipsa modi numquam facilis. esse aliquam alias
                    placeat. Assumenda soluta ad maxime non laudantium, minus
                    asperiores eligendi mollitia in voluptatem vitae expedita
                    nihil quae, sapiente quis obcaecati. Sit molestiae ipsa modi
                    numquam facilis. placeat. Assumenda soluta ad maxime non
                    laudantium.
                </p>
            </div>
        );
    },
);
