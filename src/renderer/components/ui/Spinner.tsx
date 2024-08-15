export default function Spinner({ size = 8 }: { size?: number }) {
    return (
        <div
            className={`h-${size} w-${size} animate-spin rounded-full border-4 border-accent border-t-accent-foreground`}
        >
            <span className="hidden" aria-readonly="true">
                loading...
            </span>
        </div>
    );
}
