const TextSkeleton = ({ text, className }: any) => {
    return (
        <>
            <div
                className={
                    className
                        ? className
                        : 'bottom-20 w-screen h-[750px] flex justify-center items-center px-5 mx-auto'
                }
            >
                <div className="animate-pulse w-full bg-gray-300 h-full rounded-lg flex justify-center items-center">
                    {text ? <p className="text-3xl">{text}</p> : null}
                </div>
            </div>
        </>
    );
};

export default TextSkeleton;
