const CustomWriting = ({ headersetting }: any) => {
    const customWriting = headersetting?.custom_writing;
    
    return (
        customWriting && (
            <p className="mt-3 text-sm">
                <span className="font-semibold">Note: </span>{' '}
                <em>{customWriting}</em>
            </p>
        )
    );
};

export default CustomWriting;
