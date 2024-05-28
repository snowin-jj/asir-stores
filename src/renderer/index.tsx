import { createRoot } from 'react-dom/client';

import './global.css';
import App from './app';
import { ThemeProvider } from './components/theme-provider';

const root = createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App />
    </ThemeProvider>,
);
