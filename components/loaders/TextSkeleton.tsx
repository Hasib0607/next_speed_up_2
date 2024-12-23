const TextSkeleton = ({ text='Loading...' }: any) => {
    return (
        <>
            <div className="absolute bottom-20 w-screen flex justify-center items-center px-5 mx-auto">
                <div className="animate-pulse w-full bg-gray-300 h-[750px] rounded-lg flex justify-center items-center">
                    <p className="text-3xl">{text}</p>
                </div>
            </div>
        </>
    );
};

export default TextSkeleton;
