import { Button } from '@/renderer/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function NotfoundPage() {
    const navigate = useNavigate();

    function handleGoBack() {
        navigate(-1);
    }

    return (
        <main className={'grid min-h-screen place-items-center'}>
            <div className={'space-y-2 text-center'}>
                <h2 className={'text-xl'}>
                    The Page you are looking for is not not found!
                </h2>
                <Button onClick={handleGoBack}>Go Back</Button>
            </div>
        </main>
    );
}
