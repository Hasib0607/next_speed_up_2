export const NotFoundMsg = ({ message, className }: any) => {
    return (
        <div className="center flex-1">
            <h3
                className={
                    className ? className : 'text-xl font-sans font-bold py-5'
                }
            >
                {message}
            </h3>
        </div>
    );
};
