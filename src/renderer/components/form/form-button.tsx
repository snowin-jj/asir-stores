import { LoaderCircle } from 'lucide-react';
import { Button } from '../ui/button';

type FormButtonProps = {
    loading: boolean;
    loadingText: string;
    disabled?: boolean;
    btnText: string;
};

export default function FormButton({
    loading,
    loadingText,
    btnText,
    disabled,
}: FormButtonProps) {
    if (loading)
        return (
            <Button type="submit" disabled={loading || disabled}>
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                {loadingText}
            </Button>
        );

    return (
        <Button type="submit" disabled={disabled}>
            {btnText}
        </Button>
    );
}
