const CallForPrice = ({
headersetting,
    cls,
    price,
    store_id,
}: any) => {
    return (
        <>
            {price === 0 && (
                <div>
                    <a href={'tel:+88' + headersetting?.phone}>
                        <p className={cls}>
                            {store_id !== 2875
                                ? 'Call for Price'
                                : 'Select Book'}
                        </p>
                    </a>
                </div>
            )}
        </>
    );
};

export default CallForPrice;
