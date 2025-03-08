const CallForPrice = ({ headersetting, cls, price }: any) => {
    return (
        price === 0 && (
            <div>
                <a href={'tel:+88' + headersetting?.phone}>
                    <p className={cls}>Call for Price</p>
                </a>
            </div>
        )
    );
};

export default CallForPrice;
