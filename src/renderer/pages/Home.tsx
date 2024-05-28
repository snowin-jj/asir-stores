import { useNavigate } from 'react-router-dom';

import { Button } from '@/renderer/components/ui/button';
import { type Panel, changePanel } from '../store';

export default function HomePage() {
    const navigate = useNavigate();

    function handlePanelNavigation(panel: Panel) {
        switch (panel) {
            case 'ADMIN':
                changePanel(panel);
                navigate('/admin');
                break;
            case 'SALES':
                navigate('/sales');
                changePanel(panel);
                break;
        }
    }

    return (
        <main className={'container grid min-h-screen place-items-center'}>
            <div className={'flex flex-col gap-2'}>
                <Button onClick={() => handlePanelNavigation('SALES')}>
                    Sales Page
                </Button>
                <Button onClick={() => handlePanelNavigation('ADMIN')}>
                    Admin Page
                </Button>
            </div>
        </main>
    );
}
