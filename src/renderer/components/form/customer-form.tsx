import { createCustomer, updateCustomer } from '@/renderer/api/orders';
import { Customer } from '@/types/order';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { z, ZodError } from 'zod';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import FormButton from './form-button';

const formSchema = z.object({
    name: z.string(),
    email: z.string().optional(),
    phone: z.string(),
    points: z.number().optional(),
    aadhaar: z.string().optional(),
});

interface CustomerFormProps {
    customer?: Customer;
    updateMode?: (mode: 'EDIT' | 'CREATE' | 'VIEW') => void;
    mode: 'EDIT' | 'CREATE' | 'VIEW';
}

export default function CustomerForm({
    mode,
    customer,
    updateMode,
}: CustomerFormProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        console.log(data);

        try {
            setLoading(true);
            const vaildatedCustomer = formSchema.parse({
                ...data,
                points: Number(data.points || 0),
            });
            let res = '';
            if (mode === 'CREATE') {
                res = await createCustomer({
                    name: vaildatedCustomer.name,
                    email: vaildatedCustomer.email,
                    phone: vaildatedCustomer.phone,
                    aadhaar: vaildatedCustomer.aadhaar,
                    points: 0,
                });
            } else {
                res = await updateCustomer(customer.id, {
                    name: vaildatedCustomer.name,
                    phone: vaildatedCustomer.phone,
                    aadhaar: vaildatedCustomer.aadhaar,
                    email: vaildatedCustomer.email,
                    points: vaildatedCustomer.points,
                });
            }
            toast.success(res);
            if (location.state?.callbackUrl) {
                navigate(location.state.callbackUrl, {
                    state: { orderItems: location.state?.orderItems },
                });
            }

            if (mode === 'VIEW') updateMode('VIEW');
        } catch (error) {
            if (error instanceof ZodError) {
                console.log(error);
                error.errors.forEach((err) => {
                    toast.error(`${err.path[1]}: ${err.message}`);
                });
                return;
            }
            const e = error as Error;
            console.log(e);
            toast.error(e.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form className="max-w-xl space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
                <Label>Name</Label>
                <Input
                    defaultValue={customer?.name}
                    disabled={mode === 'VIEW'}
                    required
                    type={'text'}
                    name="name"
                    placeholder="Enter the customer name"
                />
            </div>
            <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input
                    defaultValue={customer?.phone}
                    disabled={mode === 'VIEW'}
                    required
                    type={'text'}
                    name="phone"
                    placeholder="Enter the customer phone"
                />
            </div>
            <div className="space-y-2">
                <Label>Points</Label>
                <Input
                    defaultValue={customer?.points || 0}
                    disabled={mode === 'VIEW' || mode === 'CREATE'}
                    required
                    type={'number'}
                    name="points"
                    placeholder="Enter the points"
                />
            </div>
            <div className="space-y-2">
                <Label>Email</Label>
                <Input
                    defaultValue={customer?.email}
                    disabled={mode === 'VIEW'}
                    type={'email'}
                    name="email"
                    placeholder="Enter the customer name"
                />
            </div>
            <div className="space-y-2">
                <Label>Aadhaar</Label>
                <Input
                    defaultValue={customer?.aadhaar}
                    disabled={mode === 'VIEW'}
                    type={'text'}
                    name="aadhaar"
                    placeholder="Enter the customer aadhaar"
                />
            </div>
            {mode !== 'VIEW' && (
                <FormButton
                    loading={loading}
                    loadingText={
                        mode === 'CREATE' ? 'Creating...' : 'Updating...'
                    }
                    btnText={mode === 'CREATE' ? 'Create' : 'Save'}
                />
            )}
        </form>
    );
}
