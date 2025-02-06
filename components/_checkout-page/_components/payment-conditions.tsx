const PaymentConditions = ({
    design,
    appStore,
    headersetting,
    setChecked,
}: any) => {
    const store_id = appStore?.id || null;

    const handleChecked = () => {
        setChecked((prev: any) => !prev);
    };

    return (
        <div>
            {headersetting?.online === 'active' && (
                <>
                    <div>
                        <label>
                            {store_id === 8729 && (
                                <input
                                    type="checkbox"
                                    className="mr-2"
                                    onChange={() => handleChecked()}
                                />
                            )}
                            I have read and agree with the website’s{' '}
                            <span>
                                <a
                                    href="/terms_and_condition"
                                    style={{
                                        color: design?.header_color,
                                    }}
                                    className="underline"
                                >
                                    Terms & Conditions
                                </a>
                            </span>
                            ,{' '}
                            <span>
                                <a
                                    href="/privacy_policy"
                                    style={{
                                        color: design?.header_color,
                                    }}
                                    className="underline"
                                >
                                    Privacy Policy
                                </a>
                            </span>{' '}
                            and{' '}
                            <span>
                                <a
                                    href="/return_policy"
                                    style={{
                                        color: design?.header_color,
                                    }}
                                    className="underline"
                                >
                                    Refund Policy
                                </a>
                            </span>
                            .
                        </label>
                    </div>
                </>
            )}
        </div>
    );
};

export default PaymentConditions;
