import { DataPageHeader } from '@/renderer/components/data-table/data-page-header';
import CustomerForm from '@/renderer/components/form/customer-form';

export default function NewCustomerPage() {
    return (
        <main className={'container my-6 w-full space-y-8'}>
            <DataPageHeader
                isBackBtn={true}
                ctaLabel="Cancel"
                variant="secondary"
                pageTitle="New Customer"
            />
            <CustomerForm mode="CREATE" />
        </main>
    );
}
