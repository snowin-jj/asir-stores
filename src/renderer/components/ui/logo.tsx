import { useNavigate } from 'react-router-dom';

import { Button } from '@/renderer/components/ui/button';
import { changePanel } from '@/renderer/store';
import { Badge } from './badge';

type LogoProps = React.ComponentPropsWithoutRef<'button'> & {
    page?: string;
};

export default function Logo({ page, className, ...props }: LogoProps) {
    const navigate = useNavigate();

    function handlePanelChange() {
        changePanel('HOME');
        navigate('/');
    }

    return (
        <button
            onClick={handlePanelChange}
            className={`flex items-center gap-2 text-left text-3xl font-black ${className}`}
            {...props}
        >
            Asir Stores
            <Badge className="mt-2" variant="secondary">
                {page || 'Admin'}
            </Badge>
        </button>
    );
}
