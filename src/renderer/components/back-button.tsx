import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

export default function BackButton() {
    const navigate = useNavigate();

    return (
        <Button
            variant="link"
            className="mb-8 p-0"
            onClick={() => navigate(-1)}
        >
            <ChevronLeft className="mr-2 h-5 w-5" /> Back
        </Button>
    );
}
