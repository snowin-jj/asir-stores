import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

type FormHeaderProps = {
    title: string;
};
export default function FormHeader({ title }: FormHeaderProps) {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">{title}</h2>
            <Button variant="secondary" onClick={() => navigate(-1)}>
                Cancel
            </Button>
        </div>
    );
}
