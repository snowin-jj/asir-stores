import { Button } from '@/renderer/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';

export interface DataHeaderButtonProps {
    label: string;
    variant?:
        | 'link'
        | 'default'
        | 'destructive'
        | 'outline'
        | 'secondary'
        | 'ghost';
    path?: string;
    navState?: object;
    action?: () => void;
}

interface DataPageHeaderProps {
    pageTitle: string;
    isBackBtn?: boolean;
    buttons?: DataHeaderButtonProps[];
}
export function DataPageHeader({
    pageTitle,
    isBackBtn = false,
    buttons,
}: DataPageHeaderProps) {
    const navigate = useNavigate();

    function handleClick(action: () => void) {
        isBackBtn ? navigate(-1) : action();
    }

    return (
        <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">{pageTitle}</h2>
            {buttons && buttons.length > 0 && (
                <nav className="flex gap-4">
                    {buttons.map((button, idx) =>
                        button.path ? (
                            <Button key={idx} variant={button.variant} asChild>
                                <Link to={button.path} state={button.navState}>
                                    {button.label}
                                </Link>
                            </Button>
                        ) : (
                            <Button
                                key={idx}
                                onClick={() => handleClick(button.action)}
                                variant={button.variant}
                            >
                                {button.label}
                            </Button>
                        ),
                    )}
                </nav>
            )}
        </div>
    );
}
