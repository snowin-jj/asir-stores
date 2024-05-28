import { Toaster } from 'react-hot-toast';
import { HashRouter, Route, Routes } from 'react-router-dom';

import HomePage from '@/renderer/pages/Home';
import NotfoundPage from '@/renderer/pages/Notfound';
import AdminLayout from '@/renderer/pages/admin';
import AdminDashboardPage from '@/renderer/pages/admin/AdminDashboard';
import TransactionsPage from '@/renderer/pages/admin/transactions';
import NewTransactionPage from '@/renderer/pages/admin/transactions/new';
import ProductsPage from '@/renderer/pages/products';
import NewProductPage from '@/renderer/pages/products/new';
import ProductPage from '@/renderer/pages/products/product';
import TransactionPage from './pages/admin/transactions/transaction';
import SalesLayout from './pages/sales';
import SalesDashboard from './pages/sales/SalesDashboard';
import OrdersPage from './pages/sales/orders';
import OrderPage from './pages/sales/orders/order';
import NewOrderPage from './pages/sales/orders/new';
import SettingsPage from './pages/admin/settings';
import CustomersPage from './pages/sales/customers';
import NewCustomerPage from './pages/sales/customers/new';
import CustomerPage from './pages/sales/customers/customer';

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
