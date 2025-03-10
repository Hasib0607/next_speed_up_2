const PaymentConditionsFortyFour = ({
    design,
    headersetting,
    setChecked,
}: any) => {
    const handleChecked = () => {
        setChecked((prev: any) => !prev);
    };

    return (
        headersetting?.online === 'active' && (
            <div>
                <p>
                    {setChecked && (
                        <input
                            type="checkbox"
                            className="mr-2"
                            onChange={() => handleChecked()}
                        />
                    )}
                    I agree to{' '}
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
                    </span>{' '}
                    of {headersetting?.website_name}.
                </p>
            </div>
        )
    );
};

export default PaymentConditionsFortyFour;
