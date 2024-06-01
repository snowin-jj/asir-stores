import { DataPageHeader } from '@/renderer/components/data-table/data-page-header';
import CustomerForm from '@/renderer/components/form/customer-form';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function NewCustomerPage() {
    const location = useLocation();

    useEffect(() => {
        console.log(location.state);
    }, []);

    return (
        <main className={'container my-6 w-full space-y-8'}>
            <DataPageHeader
                buttons={[
                    {
                        label: 'Cancel',
                        path: location.state.callbackUrl,
                        variant: 'secondary',
                        navState: { orderItems: location.state?.orderItems },
                    },
                ]}
                pageTitle="New Customer"
            />
            <CustomerForm mode="CREATE" />
        </main>
    );
}
