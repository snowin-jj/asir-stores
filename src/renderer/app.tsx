import { HashRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import HomePage from '@/renderer/pages/Home';
import AdminDashboardPage from '@/renderer/pages/admin/AdminDashboard';
import AdminLayout from '@/renderer/pages/admin';
import NotfoundPage from '@/renderer/pages/Notfound';
import TransactionsPage from '@/renderer/pages/admin/transactions';
import ProductsPage from '@/renderer/pages/admin/products';
import NewProductPage from '@/renderer/pages/admin/products/new';
import NewTransactionPage from '@/renderer/pages/admin/transactions/new';
import ProductPage from '@/renderer/pages/admin/products/product';

export default function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" index element={<HomePage />} />
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboardPage />} />
                    <Route path="products" element={<ProductsPage />} />
                    <Route path="products/:id" element={<ProductPage />} />
                    <Route path="products/new" element={<NewProductPage />} />
                    <Route path="transactions" element={<TransactionsPage />} />
                    <Route
                        path="transactions/new"
                        element={<NewTransactionPage />}
                    />
                </Route>
                <Route path="*" element={<NotfoundPage />} />
            </Routes>
            <Toaster />
        </HashRouter>
    );
}
