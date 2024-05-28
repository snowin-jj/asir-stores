import {
    Customer,
    CustomerPayload,
    CustomerWithDetails,
    OrderPayload,
    OrderPayloadWithItems,
    OrderWithCustomer,
    OrderWithDetails,
} from '@/types/order';

export async function getOrders() {
    try {
        const data = JSON.parse(
            await window.api.getOrders(),
        ) as OrderWithCustomer[];
        return data;
    } catch (error) {
        const e = error as Error;
        throw new Error(e.message);
    }
}

export async function getOrdersWithDetails() {
    try {
        const data = JSON.parse(
            await window.api.getOrdersWithDetails(),
        ) as OrderWithDetails[];
        return data;
    } catch (error) {
        const e = error as Error;
        throw new Error(e.message);
    }
}

export async function getOrder(orderId: number) {
    try {
        const data = JSON.parse(
            await window.api.getOrder(orderId),
        ) as OrderWithDetails;
        return data;
    } catch (error) {
        const e = error as Error;
        throw new Error(e.message);
    }
}

export async function createOrder(payload: OrderPayloadWithItems) {
    try {
        const res = JSON.parse(await window.api.createOrder(payload));
        return res;
    } catch (error) {
        const e = error as Error;
        throw new Error(e.message);
    }
}

export async function updateOrder(orderId: number, payload: OrderPayload) {
    try {
        const res = JSON.parse(await window.api.updateOrder(orderId, payload));
        return res;
    } catch (error) {
        const e = error as Error;
        throw new Error(e.message);
    }
}

export async function getCustomer(customerId: number) {
    try {
        const res = JSON.parse(
            await window.api.getCustomer(customerId),
        ) as Customer;
        return res;
    } catch (error) {
        const e = error as Error;
        throw new Error(e.message);
    }
}

export async function getCustomers() {
    try {
        const res = JSON.parse(await window.api.getCustomers()) as Customer[];
        return res;
    } catch (error) {
        const e = error as Error;
        throw new Error(e.message);
    }
}

export async function createCustomer(payload: CustomerPayload) {
    try {
        const res = JSON.parse(await window.api.createCustomer(payload));
        return res;
    } catch (error) {
        const e = error as Error;
        throw new Error(e.message);
    }
}

export async function updateCustomer(
    customerId: number,
    payload: CustomerPayload,
) {
    try {
        const res = JSON.parse(
            await window.api.updateCustomer(customerId, payload),
        );
        return res;
    } catch (error) {
        const e = error as Error;
        throw new Error(e.message);
    }
}

export async function getOrdersAsLabel() {
    const data = await getOrders();

    return data.map((order) => {
        return {
            label: order.isPaid,
            value: order.isPaid,
            icon: undefined,
        };
    });
}
