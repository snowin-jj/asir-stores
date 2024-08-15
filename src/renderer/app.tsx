import { lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import { HashRouter, Route, Routes } from 'react-router-dom';

import HomePage from '@/renderer/pages/Home';
import AdminLayout from '@/renderer/pages/admin';
import SalesLayout from './pages/sales';

const NotfoundPage = lazy(() => import('@/renderer/pages/Notfound'));
const AdminDashboardPage = lazy(
    () => import('@/renderer/pages/admin/AdminDashboard'),
);
const TransactionsPage = lazy(
    () => import('@/renderer/pages/admin/transactions'),
);
const NewTransactionPage = lazy(
    () => import('@/renderer/pages/admin/transactions/new'),
);
const ProductsPage = lazy(() => import('@/renderer/pages/products'));
const NewProductPage = lazy(() => import('@/renderer/pages/products/new'));
const ProductPage = lazy(() => import('@/renderer/pages/products/product'));
const TransactionPage = lazy(
    () => import('./pages/admin/transactions/transaction'),
);
const SalesDashboard = lazy(() => import('./pages/sales/SalesDashboard'));
const OrdersPage = lazy(() => import('./pages/sales/orders'));
const OrderPage = lazy(() => import('./pages/sales/orders/order'));
const NewOrderPage = lazy(() => import('./pages/sales/orders/new'));
const SettingsPage = lazy(() => import('./pages/admin/settings'));
const CustomersPage = lazy(() => import('./pages/sales/customers'));
const NewCustomerPage = lazy(() => import('./pages/sales/customers/new'));
const CustomerPage = lazy(() => import('./pages/sales/customers/customer'));

export default function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" index element={<HomePage />} />
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboardPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                    <Route path="products" element={<ProductsPage />} />
                    <Route path="products/:id" element={<ProductPage />} />
                    <Route path="products/new" element={<NewProductPage />} />
                    <Route path="transactions" element={<TransactionsPage />} />
                    <Route
                        path="transactions/:id"
                        element={<TransactionPage />}
                    />
                    <Route
                        path="transactions/new"
                        element={<NewTransactionPage />}
                    />
                </Route>
                <Route path="/sales" element={<SalesLayout />}>
                    <Route index element={<SalesDashboard />} />
                    <Route path="products" element={<ProductsPage />} />
                    <Route path="orders" element={<OrdersPage />} />
                    <Route path="orders/:id" element={<OrderPage />} />
                    <Route path="orders/new" element={<NewOrderPage />} />
                    <Route path="customers" element={<CustomersPage />} />
                    <Route path="customers/:id" element={<CustomerPage />} />
                    <Route path="customers/new" element={<NewCustomerPage />} />
                </Route>
                <Route path="*" element={<NotfoundPage />} />
            </Routes>
            <Toaster />
        </HashRouter>
    );
}
