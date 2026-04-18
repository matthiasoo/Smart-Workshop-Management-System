export default function Loading() {
    return (
        <div className="flex flex-col flex-1 justify-center items-center w-full min-h-[50vh] gap-6 animate-pulse">
            <div className="relative flex justify-center items-center">
                <div className="absolute animate-ping rounded-full h-16 w-16 border border-primary/50"></div>
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary shadow-[0_0_15px_var(--color-primary)]"></div>
            </div>
        </div>
    )
}
