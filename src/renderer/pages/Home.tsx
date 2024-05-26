import { Link } from 'react-router-dom';

import { Button } from '@/renderer/components/ui/button';

export default function HomePage() {
    return (
        <main className={'container grid min-h-screen place-items-center'}>
            <div className={'flex flex-col gap-2'}>
                <Button asChild>
                    <Link to="/sales">Sales Page</Link>
                </Button>
                <Button asChild>
                    <Link to="/admin">Admin Page</Link>
                </Button>
            </div>
        </main>
    );
}
